import { UsersListData } from '../pages/system/users/data';
import { Effect } from 'dva';
import { Reducer } from 'react';
import { list, add, queryById } from '../pages/system/users/service';

export interface UsersModelState {
  result: UsersListData;
}

export interface UsersModel {
  namespace: 'users';
  state: UsersModelState;
  effects: {
    fetch: Effect;
    fetchById: Effect;
    add: Effect;
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
    *fetchById({ callback, payload }, { call }) {
      const response = yield call(queryById, payload);
      if (callback) callback(response);
    },
    *add({ callback, payload }, { call }) {
      const response = yield call(add, payload);
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

export default UsersModel;
