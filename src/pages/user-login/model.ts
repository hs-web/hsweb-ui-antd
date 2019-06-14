import { routerRedux } from 'dva/router';
import { getPageQuery, setAuthority } from './utils/utils';
import { userLogin } from './service';
import { Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import { setAccessToken, setAutz } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export interface IStateType {
  status?: 200 | 400;
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: IStateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: IStateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<IStateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'user/saveCurrentUser',
        payload: (response.result || {}).user,
      });
      // Login successfully
      if (response.status === 200) {
        console.log('token:' + response.result.token);
        setAccessToken(response.result.token);
        setAutz(response.result);
        reloadAuthorized();

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
