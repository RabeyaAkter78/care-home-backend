import mongoose from 'mongoose';
import { User } from '../modules/user/user.model';
import config from '../config';

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Seed: Connected to DB.');

    // Check if admin already exists
    const adminExist = await User.findOne({ role: 'ADMIN' });
    if (!adminExist) {
      const adminUser = await User.create({
        name: 'Super Admin',
        email: 'admin@aucareop.com',
        phone: '1234567890',
        password: 'adminpassword123',
        role: 'ADMIN',
        status: 'ACTIVE',
      });
      console.log('Seeded Admin successfully:', adminUser.email);
    } else {
      console.log('Admin already exists. Skipping seed.');
    }

    // Seed VA Coordinator
    const vacExist = await User.findOne({ role: 'VA_COORDINATOR' });
    if (!vacExist) {
      const vacUser = await User.create({
        name: 'VA Coordinator Jane',
        email: 'vac@aucareop.com',
        phone: '0987654321',
        password: 'vacpassword123',
        role: 'VA_COORDINATOR',
        status: 'ACTIVE',
      });
      console.log('Seeded VA Coordinator successfully:', vacUser.email);
    }

    // Seed Care Staff
    const csExist = await User.findOne({ role: 'CARE_STAFF' });
    if (!csExist) {
      const csUser = await User.create({
        name: 'Caregiver John',
        email: 'caregiver@aucareop.com',
        phone: '1122334455',
        password: 'carepassword123',
        role: 'CARE_STAFF',
        status: 'ACTIVE',
      });
      console.log('Seeded Care Staff successfully:', csUser.email);
    }

    // Seed Family Portal
    const fpExist = await User.findOne({ role: 'FAMILY_PORTAL' });
    if (!fpExist) {
      const fpUser = await User.create({
        name: 'Family Submitter Robert',
        email: 'family@aucareop.com',
        phone: '5566778899',
        password: 'familypassword123',
        role: 'FAMILY_PORTAL',
        status: 'ACTIVE',
        age: 45,
        emergencyContact: 'Jane Submitter (Wife) - 5566778800',
      });
      console.log('Seeded Family Portal successfully:', fpUser.email);
    }

    console.log('Database Seeding finished successfully.');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding DB:', error);
    await mongoose.connection.close();
  }
};

seedAdmin();
