import request from "@/utils/request";
import { PermissionItem } from "./data";

export async function list(params: any) {
    return request(`/hsweb/permission`, {
        method: 'GET',
        data: params,
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
    })
}
export async function update(params: PermissionItem) {
    return request(`hsweb/permission`, {
        method: 'PATCH',
        data: params,
    })
}
