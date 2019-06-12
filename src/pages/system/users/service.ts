import request from "@/utils/request";
import { UserItem } from "./data";

export async function list(params: any) {
    return request(`/hsweb/user`, {
        method: 'GET',
        data: params,
    });
}

export async function remove(id: string) {
    return request(`/hsweb/user/${id}`, {
        method: 'DELETE',
    });
}

export async function add(params: UserItem) {
    return request(`/hsweb/user`, {
        method: 'POST',
        data: params,
    })
}
export async function update(params: UserItem) {
    return request(`hsweb/user`, {
        method: 'PATCH',
        data: params,
    })
}
