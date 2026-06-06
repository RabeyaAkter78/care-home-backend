import { TApplication } from './application.interface';
import { Application } from './application.model';
import QueryBuilder from '../../utils/QueryBuilder';

const createApplicationIntoDB = async (payload: TApplication, submitterId?: string) => {
  if (submitterId) {
    payload.submitterId = submitterId as any;
  }
  payload.status = 'PENDING';
  const result = await Application.create(payload);
  return result;
};

const getAllApplicationsFromDB = async (query: Record<string, unknown>) => {
  const appQuery = new QueryBuilder(
    Application.find().populate('carePreference.preferredCareHomeId').populate('submitterId').populate('assignedCoordinatorId'),
    query,
  )
    .search(['applicantInfo.name', 'applicantInfo.email', 'status'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await appQuery.modelQuery;
  const meta = await appQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleApplicationFromDB = async (id: string) => {
  const result = await Application.findById(id)
    .populate('carePreference.preferredCareHomeId')
    .populate('submitterId')
    .populate('assignedCoordinatorId');
  return result;
};

const updateApplicationInDB = async (id: string, payload: Partial<TApplication>) => {
  const result = await Application.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const ApplicationServices = {
  createApplicationIntoDB,
  getAllApplicationsFromDB,
  getSingleApplicationFromDB,
  updateApplicationInDB,
};
