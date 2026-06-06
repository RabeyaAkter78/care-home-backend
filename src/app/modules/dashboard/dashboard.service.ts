import { User } from '../user/user.model';
import { Resident } from '../resident/resident.model';
import { Application } from '../application/application.model';
import { Invoice } from '../invoice/invoice.model';
import { Bed } from '../room/room.model';
import { CareHome } from '../careHome/careHome.model';
import { Task } from '../task/task.model';
import mongoose from 'mongoose';

const getAdminDashboard = async () => {
  const [
    totalResidents,
    totalVACoordinators,
    totalCareStaff,
    recentResidents,
    recentApplications,
  ] = await Promise.all([
    Resident.countDocuments({ status: 'ACTIVE' }),
    User.countDocuments({ role: 'VA_COORDINATOR' }),
    User.countDocuments({ role: 'CARE_STAFF' }),
    Resident.find().sort({ createdAt: -1 }).limit(5).populate('roomId bedId careHomeId'),
    Application.find().sort({ createdAt: -1 }).limit(5),
  ]);

  // Aggregate total and monthly revenue
  const revenueAggregation = await Invoice.aggregate([
    { $match: { status: 'PAID' } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalAmount' },
      },
    },
  ]);

  const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;

  // Monthly Revenue Graph data
  const monthlyRevenue = await Invoice.aggregate([
    { $match: { status: 'PAID' } },
    {
      $group: {
        _id: { $month: '$issueDate' },
        revenue: { $sum: '$totalAmount' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Occupancy Graph trend
  const totalBeds = await Bed.countDocuments();
  const occupiedBeds = await Bed.countDocuments({ status: 'OCCUPIED' });

  return {
    analytics: {
      totalResidents,
      totalVACoordinators,
      totalCareStaff,
      totalRevenue,
      monthlyRevenueData: monthlyRevenue.map((item) => ({
        month: item._id,
        revenue: item.revenue,
      })),
    },
    occupancyTrend: {
      totalBeds,
      occupiedBeds,
      availableBeds: totalBeds - occupiedBeds,
    },
    recentResidents,
    recentApplications,
  };
};

const getCareStaffDashboard = async (userId: string) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const [
    assignedResidentsCount,
    todayCompletedTasks,
    todayIncompletedTasks,
    todayTasksTable,
  ] = await Promise.all([
    Resident.countDocuments({ assignedCareStaffId: userId, status: 'ACTIVE' }),
    Task.countDocuments({
      careStaffId: userId,
      status: 'COMPLETED',
      updatedAt: { $gte: todayStart, $lte: todayEnd },
    }),
    Task.countDocuments({
      careStaffId: userId,
      status: 'INCOMPLETED',
    }),
    Task.find({
      careStaffId: userId,
    })
      .sort({ priority: 1, createdAt: -1 })
      .populate('residentId', 'name roomId bedId'),
  ]);

  return {
    analytics: {
      assignedResidentsCount,
      todayCompletedTasks,
      todayIncompletedTasks,
    },
    todayTasksTable,
  };
};

const getVACoordinatorDashboard = async () => {
  const [
    totalApplications,
    recentApplications,
    totalCareStaff,
    occupiedCareStaff,
    totalBeds,
    occupiedBeds,
    maintenanceBeds,
  ] = await Promise.all([
    Application.countDocuments(),
    Application.find({ status: 'PENDING' }).sort({ createdAt: -1 }).limit(10),
    User.countDocuments({ role: 'CARE_STAFF' }),
    Resident.distinct('assignedCareStaffId', { status: 'ACTIVE' }),
    Bed.countDocuments(),
    Bed.countDocuments({ status: 'OCCUPIED' }),
    Bed.countDocuments({ status: 'MAINTENANCE' }),
  ]);

  return {
    analytics: {
      totalApplications,
      careStaff: {
        total: totalCareStaff,
        occupied: occupiedCareStaff.length,
        available: Math.max(0, totalCareStaff - occupiedCareStaff.length),
      },
      beds: {
        total: totalBeds,
        occupied: occupiedBeds,
        maintenance: maintenanceBeds,
        available: Math.max(0, totalBeds - occupiedBeds - maintenanceBeds),
      },
    },
    recentApplications,
  };
};

const getFamilyPortalDashboard = async (userId: string) => {
  // Aggregate invoices for residents submitted by this user
  const clientEmail = (await User.findById(userId))?.email;

  const [
    totalInvoices,
    paidAggregation,
  ] = await Promise.all([
    Invoice.countDocuments({ clientEmail }),
    Invoice.aggregate([
      { $match: { clientEmail, status: 'PAID' } },
      {
        $group: {
          _id: null,
          totalPaid: { $sum: '$totalAmount' },
        },
      },
    ]),
  ]);

  const totalPaidAmount = paidAggregation[0]?.totalPaid || 0;
  const invoices = await Invoice.find({ clientEmail }).sort({ createdAt: -1 });

  return {
    analytics: {
      totalInvoices,
      totalPaidAmount,
    },
    invoices,
  };
};

const getCareHomeAnalytics = async () => {
  const [
    totalCareHomes,
    capacityAgg,
  ] = await Promise.all([
    CareHome.countDocuments(),
    CareHome.aggregate([
      {
        $group: {
          _id: null,
          totalCapacity: { $sum: '$totalCapacity' },
          currentOccupancy: { $sum: '$currentOccupancy' },
        },
      },
    ]),
  ]);

  const totalCapacity = capacityAgg[0]?.totalCapacity || 0;
  const occupied = capacityAgg[0]?.currentOccupancy || 0;
  const avgOccupancyRate = totalCapacity > 0 ? (occupied / totalCapacity) * 100 : 0;

  return {
    totalCareHomes,
    totalCapacity,
    occupied,
    avgOccupancyRate: Number(avgOccupancyRate.toFixed(2)),
  };
};

export const DashboardServices = {
  getAdminDashboard,
  getCareStaffDashboard,
  getVACoordinatorDashboard,
  getFamilyPortalDashboard,
  getCareHomeAnalytics,
};
