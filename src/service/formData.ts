import request from '@/utils/request';

interface PaginationParams extends IPagenationParams {
  formId: string;
}

export async function getPaged(params: PaginationParams) {
  return request(`/form/data`, { method: 'get', params });
}
