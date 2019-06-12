import request from "@/utils/request";
import { RoleItem } from "./data";

export async function list(params: any) {
    return request(`/hsweb/role`, {
        method: 'GET',
        data: params,
    });
}

export async function remove(id: string) {
    return request(`/hsweb/role/${id}`, {
        method: 'DELETE',
    });
}

export async function add(params: RoleItem) {
    return request(`/hsweb/role`, {
        method: 'POST',
        data: params,
    })
}
export async function update(params: RoleItem) {
    return request(`hsweb/role`, {
        method: 'PATCH',
        data: params,
    })
}
