import mongoose from 'mongoose';
import config from '../config';
import { User } from '../modules/user/user.model';
import { CareHome } from '../modules/careHome/careHome.model';
import { Room, Bed } from '../modules/room/room.model';
import { Application } from '../modules/application/application.model';
import { Resident } from '../modules/resident/resident.model';
import { Task } from '../modules/task/task.model';
import { IncidentReport } from '../modules/incidentReport/incidentReport.model';
import { CarePlan } from '../modules/carePlan/carePlan.model';
import { Invoice } from '../modules/invoice/invoice.model';
import { Message } from '../modules/message/message.model';
import { UserServices } from '../modules/user/user.service';
import { CareHomeServices } from '../modules/careHome/careHome.service';
import { RoomServices } from '../modules/room/room.service';
import { ApplicationServices } from '../modules/application/application.service';
import { ResidentServices } from '../modules/resident/resident.service';
import { TaskServices } from '../modules/task/task.service';
import { IncidentReportServices } from '../modules/incidentReport/incidentReport.service';
import { CarePlanServices } from '../modules/carePlan/carePlan.service';
import { InvoiceServices } from '../modules/invoice/invoice.service';
import { MessageServices } from '../modules/message/message.service';
import { DashboardServices } from '../modules/dashboard/dashboard.service';

const runVerification = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Verification: Connected to MongoDB.');

    // Clear test database or run isolation
    console.log('Cleaning existing testing models...');
    await Promise.all([
      User.deleteMany({}),
      CareHome.deleteMany({}),
      Room.deleteMany({}),
      Bed.deleteMany({}),
      Application.deleteMany({}),
      Resident.deleteMany({}),
      Task.deleteMany({}),
      IncidentReport.deleteMany({}),
      CarePlan.deleteMany({}),
      Invoice.deleteMany({}),
      Message.deleteMany({}),
    ]);

    // 1. Create Users
    console.log('Testing: User Creation');
    const admin = await UserServices.createUserIntoDB({
      name: 'Admin User',
      email: 'admin@test.com',
      phone: '1234567890',
      password: 'testpassword',
      role: 'ADMIN',
      status: 'ACTIVE',
    } as any);

    const vac = await UserServices.createUserIntoDB({
      name: 'VA Coord',
      email: 'vac@test.com',
      phone: '1234567891',
      password: 'testpassword',
      role: 'VA_COORDINATOR',
      status: 'ACTIVE',
    } as any);

    const caregiver = await UserServices.createUserIntoDB({
      name: 'Caregiver John',
      email: 'caregiver@test.com',
      phone: '1234567892',
      password: 'testpassword',
      role: 'CARE_STAFF',
      status: 'ACTIVE',
    } as any);

    const family = await UserServices.createUserIntoDB({
      name: 'Family Rob',
      email: 'family@test.com',
      phone: '1234567893',
      password: 'testpassword',
      role: 'FAMILY_PORTAL',
      status: 'ACTIVE',
    } as any);

    console.log('✔ User Creation Passed');

    // 2. Create Care Home
    console.log('Testing: CareHome Creation');
    const careHome = await CareHomeServices.createCareHomeIntoDB({
      name: 'Sunrise Villa',
      address: '123 Sunny St',
      facilityTypes: ['Assisted Living', 'Memory Care'],
      licenseNo: 'LIC-9988-88',
      status: 'ACTIVE',
      phone: '888-777-6666',
      emergencyContact: '888-777-6699',
      email: 'sunrise@care.com',
      manager: 'Jane Doe',
      totalCapacity: 0,
      currentOccupancy: 0,
    } as any);
    console.log('✔ CareHome Creation Passed');

    // 3. Create Room (which auto creates beds and updates CareHome capacity)
    console.log('Testing: Room & Bed Auto-generation');
    const room = await RoomServices.createRoomIntoDB({
      roomNo: '101',
      floorNo: 1,
      bedsCount: 2,
      bedTypes: 'Double',
      roomFeatures: ['Private Bathroom', 'Wifi', 'TV'],
      roomType: 'Deluxe',
      careHomeId: careHome._id,
    } as any);

    // Verify beds count and care home totalCapacity
    const generatedBedsCount = await Bed.countDocuments({ roomId: room._id });
    const updatedCareHome = await CareHome.findById(careHome._id);

    if (generatedBedsCount !== 2) throw new Error('Beds auto generation failed');
    if (updatedCareHome?.totalCapacity !== 2) throw new Error('Care home capacity update failed');
    console.log('✔ Room & Bed Auto-generation Passed');

    // 4. Create Care Application
    console.log('Testing: Application Creation');
    const application = await ApplicationServices.createApplicationIntoDB({
      applicantInfo: {
        name: 'Grandpa Joe',
        email: 'joe@grandpa.com',
        phone: '555-555-5555',
        emergencyContact: 'Family Rob - 1234567893',
        gender: 'Male',
        age: 82,
        address: 'Old Town',
        dateOfBirth: '1944-01-01',
        ssn: '111-222-3333',
      },
      medicalInfo: {
        primaryPhysician: 'Dr. Smith',
        medicalCondition: 'Mild dementia',
        medications: 'Donepezil 10mg daily',
        allergies: 'Penicillin',
        mobilityLevel: 'Care assistance',
      },
      carePreference: {
        desiredCareLevel: 'Standard care',
        preferredCareHomeId: careHome._id,
        roomPreference: 'Deluxe',
        dietaryRequirements: 'Low sodium',
      },
      moveInDate: new Date(),
      status: 'PENDING',
    } as any, family._id.toString());
    console.log('✔ Application Submission Passed');

    // 5. Update Application Status to APPROVED
    console.log('Testing: Application Approval & Bed Assignment');
    await ApplicationServices.updateApplicationInDB(application._id.toString(), {
      status: 'APPROVED',
      assignedCoordinatorId: vac._id,
    } as any);

    // Get an available bed
    const availableBed = await Bed.findOne({ careHomeId: careHome._id, status: 'AVAILABLE' });
    if (!availableBed) throw new Error('No available bed found');

    // Create resident from application details
    const resident = await ResidentServices.createResidentIntoDB({
      name: application.applicantInfo.name,
      email: application.applicantInfo.email,
      phone: application.applicantInfo.phone,
      emergencyContact: application.applicantInfo.emergencyContact,
      age: application.applicantInfo.age,
      roomId: room._id,
      bedId: availableBed._id,
      careHomeId: careHome._id,
      careLevel: 'Standard',
      status: 'ACTIVE',
      admittedDate: new Date(),
      paymentStatus: 'PENDING',
      monthlyPaymentAmount: 2500,
      assignedCareStaffId: caregiver._id,
      assignedCoordinatorId: vac._id,
      allergies: application.medicalInfo.allergies,
      medications: application.medicalInfo.medications,
      mobilityStatus: application.medicalInfo.mobilityLevel,
      dietary: application.carePreference.dietaryRequirements,
      applicationId: application._id,
    } as any);

    // Verify Bed Status is OCCUPIED
    const occupiedBed = await Bed.findById(availableBed._id);
    if (occupiedBed?.status !== 'OCCUPIED') throw new Error('Bed status did not sync to occupied');

    // Verify CareHome occupancy increment
    const occupancyCareHome = await CareHome.findById(careHome._id);
    if (occupancyCareHome?.currentOccupancy !== 1) throw new Error('Care home occupancy did not increment');
    console.log('✔ Application Approval & Bed Assignment Passed');

    // 6. Care Plan upsert
    console.log('Testing: Care Plan Upsert');
    const carePlan = await CarePlanServices.createOrUpdateCarePlanIntoDB({
      residentId: resident._id,
      hydrationDietTarget: 'Maintain Healthy Weight & Hydration',
      hydrationDietInstructions: 'Ensure 2 liters of water daily',
      adlDailyTarget: {
        dressing: 'Needs help with buttons',
        mobility: 'Assist with walking helper',
      },
      medications: [
        { medicineName: 'Donepezil 10mg', timeFrequency: 'Once daily in morning' },
      ],
      medicalConditions: [
        { conditionName: 'Hypertension', actionRequired: 'Monitor BP weekly' },
      ],
    } as any);
    console.log('✔ Care Plan Upsert Passed');

    // 7. Tasks Assignment
    console.log('Testing: Task Assignment');
    const task = await TaskServices.createTaskIntoDB({
      taskName: 'Record vital signs & blood pressure',
      taskType: 'Vital Sign',
      priority: 'High',
      scheduledTime: 'Daily morning',
      residentId: resident._id,
      careStaffId: caregiver._id,
    } as any);
    console.log('✔ Task Assignment Passed');

    // 8. Vital signs logging
    console.log('Testing: Vital Signs Logging');
    await ResidentServices.addVitalSignsIntoDB(resident._id.toString(), {
      bloodPressure: '120/80',
      heartRate: 72,
      temperature: 98.6,
      saturation: 99,
      notes: 'Doing well',
    }, caregiver._id.toString());
    console.log('✔ Vital Signs Logging Passed');

    // 9. Invoice creation & payment simulation
    console.log('Testing: Invoice Processing & payment update');
    const invoice = await InvoiceServices.createInvoiceIntoDB({
      invoiceNo: 'INV-2026-001',
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      clientName: resident.name,
      clientEmail: resident.email || 'client@test.com',
      description: 'Monthly Care Home fee',
      quantity: 1,
      rates: 2500,
      residentId: resident._id,
    } as any);

    // Verify subtotal and calculations
    if (invoice.subtotal !== 2500) throw new Error('Subtotal calculation failed');
    if (invoice.tax !== 250) throw new Error('Tax calculation failed');
    if (invoice.totalAmount !== 2750) throw new Error('Total amount calculation failed');

    // Update status to PAID
    await InvoiceServices.updateInvoiceStatusInDB(invoice._id.toString(), 'PAID');
    const updatedResident = await Resident.findById(resident._id);
    if (updatedResident?.paymentStatus !== 'PAID') throw new Error('Resident payment status did not sync to PAID');
    console.log('✔ Invoice Processing Passed');

    // 10. Incident Reporting
    console.log('Testing: Incident Reporting');
    await IncidentReportServices.createIncidentReportIntoDB({
      type: 'Fall',
      residentId: resident._id,
      severityLevel: 'Medium',
      witnesses: ['Staff Nurse Sarah'],
      description: 'Grandpa Joe tripped over a rug.',
      immediateActionTaken: 'Assisted up, checked vitals (normal), ice applied to elbow.',
    } as any, caregiver._id.toString());
    console.log('✔ Incident Reporting Passed');

    // 11. Messaging
    console.log('Testing: Messaging System');
    await MessageServices.sendMessageIntoDB({
      receiverId: vac._id,
      content: 'Hello VA Coordinator, can you check Grandpa Joe\'s care plan?',
    } as any, caregiver._id.toString());
    console.log('✔ Messaging System Passed');

    // 12. Dashboard Analytics
    console.log('Testing: Dashboard Analytics Aggregations');
    const adminDash = await DashboardServices.getAdminDashboard();
    const vacDash = await DashboardServices.getVACoordinatorDashboard();
    const csDash = await DashboardServices.getCareStaffDashboard(caregiver._id.toString());
    const familyDash = await DashboardServices.getFamilyPortalDashboard(family._id.toString());

    if (!adminDash || !vacDash || !csDash || !familyDash) {
      throw new Error('Dashboard analytics failed to load');
    }
    console.log('✔ Dashboard Analytics Passed');

    console.log('\n=======================================');
    console.log('🎉 ALL BACKEND VERIFICATIONS COMPLETED SUCCESSFULLY 🎉');
    console.log('=======================================');
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Verification Failed:', error);
    await mongoose.connection.close();
  }
};

runVerification();
