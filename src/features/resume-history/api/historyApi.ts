import { authRequest } from '@/axios/axios';
import { Application } from '@/app/types';

export const fetchResumes = async (): Promise<Application[]> => {
  const response = await authRequest('get', `/applications`);
  return response;
};

export const createResume = async (
  applicationId: string,
  data: Application
): Promise<Application> => {
  const response = await authRequest('post', `/applications/create`, data);
  return response as Application;
};

export const deleteResume = async (applicationId: string): Promise<void> => {
  const response = await authRequest('delete', `/applications/${applicationId}/delete`);
};
