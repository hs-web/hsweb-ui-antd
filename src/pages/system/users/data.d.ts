export interface UserItem {
  id: string;
  name?: string;
  status?: number;
  username?: string;
  remark?: string;
  password?: string;
  createTime?: number;
  creatorId?: string;
  creatorIdProperty?: string;
  roles?: string[] | number[];
}

export interface UsersListData {
  data: UserItem[];
  pageIndex: number;
  pageSize: number;
  total: number;
}
