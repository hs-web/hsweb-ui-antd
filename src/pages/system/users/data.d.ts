export interface UserItem {
    id: string;
    name: string;
    status: number;
    username: string;
    createTime: number;
    creatorId: string;
    creatorIdProperty: string;
}

export interface UsersListData {
    data: UserItem[];
    pageIndex: number;
    pageSize: number;
    total: number;
}