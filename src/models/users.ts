import { UsersListData } from '../pages/system/users/data';
import { Effect } from 'dva';
import { Reducer } from 'react';
import { list } from '../pages/system/users/service';

export interface UsersModelState {
  result: UsersListData;
}

export interface UsersModel {
  namespace: 'users';
  state: UsersModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  };
}

const UsersModel: UsersModel = {
  namespace: 'users',
  state: {
    result: {
      data: [],
      pageIndex: 0,
      pageSize: 0,
      total: 0,
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(list, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
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

export default UsersModel;
