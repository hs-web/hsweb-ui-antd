import { PermissionListData } from "@/pages/system/permission/data";
import { Effect } from "dva";
import { Reducer } from "react";
import { list } from "@/pages/system/permission/service";

export interface PermissionModelState {
    result: PermissionListData;
}

export interface PermissionModel {
    namespace: 'permission';
    state: PermissionModelState;
    effects: {
        fetch: Effect;
    };
    reducers: {
        save: Reducer<any, any>;
    }
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
export default PermissionModel;
