export class CurrentPermission {
  details: PermissionDetail[];
  id: string;
  menus: [];
  settingFor: string;
  status: number;
  type: string;
}

export class PermissionDetail {
  actions: string[];
  dataAccesses: string;
  id: string;
  merge: boolean;
  permissionId: string;
  priority: number;
  settingId: string;
  status: number;
}
