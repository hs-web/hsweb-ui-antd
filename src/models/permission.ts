import { PermissionListData } from '@/pages/system/permission/data';
import { Effect } from 'dva';
import { Reducer } from 'react';
import { list, autzSetting, setAutz } from '@/pages/system/permission/service';

export interface PermissionModelState {
  result: PermissionListData;
}

export interface PermissionModel {
  namespace: 'permission';
  state: PermissionModelState;
  effects: {
    fetch: Effect;
    autzSetting: Effect;
    setAutzData: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const PermissionModel: PermissionModel = {
  namespace: 'permission',
  state: {
    result: {
      data: [],
      pageIndex: 0,
      pageSize: 0,
      total: 0,
    },
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(list, payload);
      console.log(response, 'respon');
      yield put({
        type: 'save',
        payload: response.result,
      });
      if (callback) callback(response);
    },
    *autzSetting({ payload, callback }, { call, put }) {
      const response = yield call(autzSetting, payload);
      if (response) callback(response);
    },
    *setAutzData({ payload, callback }, { call, put }) {
      const response = yield call(setAutz, payload);
      if (callback) callback(response);
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        result: action.payload,
      };
    },
  },
};
export default PermissionModel;
