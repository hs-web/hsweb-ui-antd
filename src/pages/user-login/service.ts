import { FromDataType } from './index';
import request from '@/utils/request';
import { getAccessToken } from '@/utils/authority';

export async function fakeAccountLogin(params: FromDataType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function userLogin(params: any): Promise<any> {
  return request(`/hsweb/authorize/login`, {
    method: 'POST',
    data: params,
  });
}

export async function loginOut(): Promise<any> {
  return request(`http://localhost:8089/user-lock/logout`, {
    method: 'PUT',
    headers: {
      'access-token': getAccessToken(),
    },
  });
}

// export async function currentUser(): Promise<any> {
//   return request(`/hsweb/authorize/me`);
// }
