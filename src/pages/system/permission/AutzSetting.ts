export class AutzSetting {
  public id: string;
  //设置给谁
  public settingFor: string;
  //设置对象类型：user(用户),role(角色)
  public type: string;
  public status: number;
  public details: Permission[];
  public menus: Menu[];

  constructor({ id, settingFor, status, type, details, menus }: AutzSetting) {
    this.id = id;
    this.settingFor = settingFor;
    this.status = status;
    this.type = type;
    this.details = details;
    this.menus = menus;
  }
}

export class Menu {
  public id: string;
  public menuId: string;
  public parentId: string;
  public path: string;
  public settingId: string;
  public status: number;

  constructor({ id, menuId, parentId, path, settingId, status }: Menus) {
    this.id = id;
    this.menuId = menuId;
    this.parentId = parentId;
    this.path = path;
    this.settingId = settingId;
    this.status = status;
  }
}

export class Permission {
  public id: string;
  public merge: boolean;
  public permissionId: string;
  public priority: number;
  public settingId: string;
  public status: number;
  public dataAccesses: string[];
  public actions: string[];

  constructor({
    id,
    merge,
    permissionId,
    priority,
    settingId,
    status,
    dataAccesses,
    actions,
  }: Permission) {
    this.id = id;
    this.merge = merge;
    this.permissionId = permissionId;
    this.priority = priority;
    this.settingId = settingId;
    this.status = status;
    this.dataAccesses = dataAccesses;
    this.actions = actions;
  }
}
