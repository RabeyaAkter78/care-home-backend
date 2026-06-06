import { TInvoice } from './invoice.interface';
import { Invoice } from './invoice.model';
import { Resident } from '../resident/resident.model';
import QueryBuilder from '../../utils/QueryBuilder';
import AppError from '../../errors/AppError';

const createInvoiceIntoDB = async (payload: TInvoice) => {
  const isExist = await Invoice.findOne({ invoiceNo: payload.invoiceNo });
  if (isExist) {
    throw new AppError(400, 'Invoice No already exists');
  }

  const result = await Invoice.create(payload);

  // Sync Resident payment status
  if (payload.residentId) {
    await Resident.findByIdAndUpdate(payload.residentId, {
      paymentStatus: 'PENDING',
      monthlyPaymentAmount: payload.totalAmount,
    });
  }

  return result;
};

const getAllInvoicesFromDB = async (query: Record<string, unknown>) => {
  const invoiceQuery = new QueryBuilder(
    Invoice.find().populate('residentId'),
    query,
  )
    .search(['invoiceNo', 'clientName', 'clientEmail', 'status'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await invoiceQuery.modelQuery;
  const meta = await invoiceQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleInvoiceFromDB = async (id: string) => {
  const result = await Invoice.findById(id).populate('residentId');
  return result;
};

const updateInvoiceStatusInDB = async (id: string, status: 'PAID' | 'PENDING' | 'OVERDUE') => {
  const invoice = await Invoice.findById(id);
  if (!invoice) {
    throw new AppError(404, 'Invoice not found');
  }

  const result = await Invoice.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );

  // Sync Resident payment status
  if (invoice.residentId) {
    const paymentStatusMap = {
      PAID: 'PAID',
      PENDING: 'PENDING',
      OVERDUE: 'OVERDUE',
    } as const;

    await Resident.findByIdAndUpdate(invoice.residentId, {
      paymentStatus: paymentStatusMap[status],
      lastPaymentDate: status === 'PAID' ? new Date() : undefined,
    });
  }

  return result;
};

export const InvoiceServices = {
  createInvoiceIntoDB,
  getAllInvoicesFromDB,
  getSingleInvoiceFromDB,
  updateInvoiceStatusInDB,
};
