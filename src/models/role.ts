import { RoleListData } from "../pages/system/role/data";
import { Effect } from "@/models/connect";
import { Reducer } from "react";
import { list } from "../pages/system/role/service";

export interface RoleModelState {
    result: RoleListData;
}

export interface RoleModel {
    namespace: 'role';
    state: RoleModelState;
    effects: {
        fetch: Effect;
    };
    reducers: {
        save: Reducer<any, any>;
    };
}

const RoleModel: RoleModel = {
    namespace: 'role',
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
            yield put({
                type: 'save',
                payload: response.result,
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                result: action.payload,
            }
        },
    },
}

export default RoleModel;
