import Permission from '.';

export class PermissionItem {
  id: string;
  name: string;
  status: number;
  type: string;
  actions: PermissionAction[];
  optionalFields: { name: string }[];
  open?: boolean;
  checkedAction: string[];
  checkAll: boolean;
}

export interface PermissionListData {
  data: PermissionItem[];
  pageIndex: number;
  pageSize: number;
  total: number;
}

export interface PermissionAction {
  action: string;
  defaultCheck: false;
  describe: string;
}
