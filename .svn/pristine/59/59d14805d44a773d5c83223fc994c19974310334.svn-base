import request from '@/utils/request';

export async function add(data: FormEntity) {
  return request('/form', { method: 'post', data: data });
}

export async function getById(formId: string) {
  return request(`/form/${formId}`);
}

export async function update(data: FormEntity) {
  return request('/form', { method: 'put', data });
}

export async function deleteById(formId: string) {
  return request(`/form/${formId}`, { method: 'delete' });
}

export async function getPaged(params: IPagenationParams) {
  return request(`/form`, { params });
}

export async function submit(data: FMFormData) {
  return request(`/form/data`, { method: 'post', data });
}
