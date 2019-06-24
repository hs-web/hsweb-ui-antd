import React, { Component } from 'react';
import { Modal, Row, Col, message, Affix, Anchor, Collapse, Switch, Divider, Checkbox } from 'antd';
import ConnectState from '@/models/connect';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { PermissionModelState } from '@/models/permission';
import { PermissionItem, PermissionAction } from '@/pages/system/permission/data';
import { CurrentPermission } from './data';
import { toUnicode } from 'punycode';
const { Link } = Anchor;
const { Panel } = Collapse;

interface SettingAutzProps {
  dispatch?: Dispatch<any>;
  settingVisible: () => void;
  loading?: boolean;
  permission?: PermissionModelState;
  settingType: string;
  settingId: string;
}

interface SettingAutzState {
  modalVisible: boolean;
  activeKey: string[] | any[];
  checkedPermission: string[] | any[] | never[];
  permissionData: PermissionItem[];
  currentPermission: CurrentPermission | undefined;
}
@connect(({ permission, loading }: ConnectState) => ({
  permission,
  loading: loading.models.permission,
}))
class SettingAutz extends Component<SettingAutzProps, SettingAutzState> {
  state: SettingAutzState = {
    modalVisible: true,
    activeKey: [],
    checkedPermission: [],
    permissionData: [], //全部的权限
    currentPermission: undefined, //当前用户的权限
  };

  componentWillMount() {
    const { dispatch, settingId, settingType } = this.props;
    if (!dispatch) return;
    dispatch({
      type: 'permission/fetch',
      payload: {
        paging: 'false',
      },
    });
    console.log(settingId, 'id');
    //获取已经选择的节点
    if (settingId) {
      dispatch({
        type: 'permission/autzSetting',
        payload: {
          settingType,
          settingId,
        },
        callback: (response: any) => {
          if (response.result) {
            const activeKey = response.result.details.map((item: any) => item.permissionId);
            this.setState({
              activeKey,
              currentPermission: response.result,
            });
          }
        },
      });
    }
  }

  componentWillReceiveProps() {
    const { permission } = this.props;
    const { activeKey, currentPermission } = this.state;
    const permissionData = permission.result.data;

    if (currentPermission) {
      permissionData.forEach(item => {
        const current = currentPermission.details.find(c => c.permissionId === item.id);
        if (activeKey.indexOf(item.id) > -1) {
          item.open = true;
          if (current) {
            if (current.actions.length === item.actions.map(e => e.action).length) {
              current.actions.push('all');
            }
            item.checkedAction = current.actions;
          }
        } else {
          item.open = false;
        }
      });
      this.setState({
        permissionData,
      });
    }
  }

  handlePermissionItem = (item: PermissionItem) => {
    const { permissionData, activeKey } = this.state;
    const data = permissionData;
    let keys = activeKey;
    data.forEach(i => {
      if (i.id === item.id) {
        i.open = !i.open;
        if (!i.open) {
          keys = activeKey.filter((k: string) => k !== item.id);
        } else {
          keys.push(item.id);
        }
      }
    });
    this.setState({
      permissionData: data,
      activeKey: keys,
    });
  };

  checkAllActions = (item: PermissionItem, action: string) => {
    const { permissionData } = this.state;
    if (action === 'all' && item.checkedAction) {
      if (item.checkedAction.some(e => e === 'all')) {
        //todo
        item.checkedAction = item.checkedAction.filter(e => e !== 'all');
        console.log('tr');
      } else {
        item.checkedAction = [];
        console.log('false');
      }
    }
    permissionData.forEach(data => {
      if (data.id === item.id) {
        console.log(data, item);
      }
    });
    console.log(item, action);
  };

  renderPanle = (permissionData: PermissionItem[]) =>
    permissionData.map(item => {
      return (
        <Panel
          header={item.name}
          key={item.id}
          id={item.id}
          showArrow={false}
          extra={
            <div>
              <Switch
                checkedChildren="启用"
                unCheckedChildren="禁用"
                checked={item.open}
                onChange={() => this.handlePermissionItem(item)}
              />
              <Divider type="vertical" />
              <a href="#">数据权限</a>
              <Divider type="vertical" />
              <a href="#">字段权限</a>
              <h2 hidden>{item.name}</h2>
            </div>
          }
        >
          <div>
            <Checkbox.Group value={item.checkedAction}>
              <Row>
                <Col span={6} style={{ height: 40 }}>
                  <Checkbox value={'all'} onChange={() => this.checkAllActions(item, 'all')}>
                    全选
                  </Checkbox>
                </Col>
                {item.actions.map((action: PermissionAction) => {
                  return (
                    <Col span={6} style={{ height: 40 }} key={action.action}>
                      <Checkbox value={action.action} style={{ width: 200 }} onChange={() => {}}>
                        {action.describe}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </div>
        </Panel>
      );
    });

  renderLink = (permissionData: PermissionItem[]) =>
    permissionData.map(item => <Link href={'#' + item.id} title={item.name} key={item.id} />);

  render() {
    const { modalVisible, activeKey, permissionData } = this.state;
    return (
      <Modal
        title="用户赋权"
        visible={modalVisible}
        width={1040}
        onCancel={() => this.setState({ modalVisible: false })}
        onOk={() => message.success('保存成功')}
      >
        <Row>
          <Col span={16} style={{ height: 600, overflow: 'auto' }}>
            <Collapse activeKey={activeKey}>{this.renderPanle(permissionData)}</Collapse>
          </Col>
          <Col span={6} offset={2} style={{ height: 600, overflow: 'auto' }}>
            <Affix>
              <Anchor>{this.renderLink(permissionData)}</Anchor>
            </Affix>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default SettingAutz;
