import request from '@/utils/request';
import { PermissionItem } from './data';

export async function list(params: any) {
  console.log(params, 'ass');
  return request(`/hsweb/permission`, {
    method: 'GET',
    params: params,
  });
}

export async function remove(id: string) {
  return request(`/hsweb/permission/${id}`, {
    method: 'DELETE',
  });
}

export async function add(params: PermissionItem) {
  return request(`/hsweb/permission`, {
    method: 'POST',
    data: params,
  });
}
export async function update(params: PermissionItem) {
  return request(`hsweb/permission`, {
    method: 'PATCH',
    data: params,
  });
}

export async function autzSetting(params: { settingId: string; settingType: string }) {
  return request(`hsweb/autz-setting/${params.settingType}/${params.settingId}`, {
    method: 'GET',
  });
}
