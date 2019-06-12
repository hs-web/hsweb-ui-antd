export class RoleItem {
    id: string;
    name: string;
    describe: string;
    status: number;
}

export interface RoleListData {
    data: RoleItem[];
    pageIndex: number;
    pageSize: number;
    total: number;
}