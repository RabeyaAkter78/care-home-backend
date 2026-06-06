import { TIncidentReport } from './incidentReport.interface';
import { IncidentReport } from './incidentReport.model';
import QueryBuilder from '../../utils/QueryBuilder';

const createIncidentReportIntoDB = async (payload: TIncidentReport, userId: string) => {
  payload.reportedBy = userId as any;
  const result = await IncidentReport.create(payload);
  return result;
};

const getAllIncidentReportsFromDB = async (query: Record<string, unknown>) => {
  const reportQuery = new QueryBuilder(
    IncidentReport.find().populate({
      path: 'residentId',
      populate: {
        path: 'roomId careHomeId',
      },
    }).populate('reportedBy', 'name email role'),
    query,
  )
    .search(['type', 'severityLevel'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await reportQuery.modelQuery;
  const meta = await reportQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleIncidentReportFromDB = async (id: string) => {
  const result = await IncidentReport.findById(id).populate({
    path: 'residentId',
    populate: {
      path: 'roomId careHomeId',
    },
  }).populate('reportedBy', 'name email role');
  return result;
};

export const IncidentReportServices = {
  createIncidentReportIntoDB,
  getAllIncidentReportsFromDB,
  getSingleIncidentReportFromDB,
};
