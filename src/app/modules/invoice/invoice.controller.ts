import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InvoiceServices } from './invoice.service';

const createInvoice = catchAsync(async (req: Request, res: Response) => {
  const result = await InvoiceServices.createInvoiceIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Invoice created successfully',
    data: result,
  });
});

const getAllInvoices = catchAsync(async (req: Request, res: Response) => {
  const result = await InvoiceServices.getAllInvoicesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoices retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleInvoice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InvoiceServices.getSingleInvoiceFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoice retrieved successfully',
    data: result,
  });
});

const updateInvoiceStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await InvoiceServices.updateInvoiceStatusInDB(id, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoice status updated successfully',
    data: result,
  });
});

export const InvoiceControllers = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  updateInvoiceStatus,
};
