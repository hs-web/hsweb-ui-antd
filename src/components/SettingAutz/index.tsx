import React, { Component } from 'react';
import { Modal, Row, Col, message, Affix, Anchor, Collapse, Switch, Divider, Checkbox } from 'antd';
import ConnectState from '@/models/connect';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { PermissionModelState } from '@/models/permission';
import { PermissionItem, PermissionAction } from '@/pages/system/permission/data';
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
  checkedPermission: string[] | any[] | never[];
}
@connect(({ permission, loading }: ConnectState) => ({
  permission,
  loading: loading.models.permission,
}))
class SettingAutz extends Component<SettingAutzProps, SettingAutzState> {
  state: SettingAutzState = {
    modalVisible: true,
    checkedPermission: ['role', 'user', 'autz-setting'],
  };

  componentWillMount() {
    const { dispatch } = this.props;
    if (!dispatch) return;
    dispatch({
      type: 'permission/fetch',
      payload: {
        paging: 'false',
      },
    });
  }

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
              <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
              <Divider type="vertical" />
              <a href="#">数据权限</a>
              <Divider type="vertical" />
              <a href="#">字段权限</a>
              <h2 hidden>{item.name}</h2>
            </div>
          }
        >
          <div>
            <Checkbox.Group>
              <Row>
                <Col span={6} style={{ height: 40 }}>
                  <Checkbox value="ALL">全选</Checkbox>
                </Col>
                {item.actions.map((action: PermissionAction) => {
                  return (
                    <Col span={6} style={{ height: 40 }} key={action.action}>
                      <Checkbox value={action.action} style={{ width: 200 }}>
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
    const { modalVisible } = this.state;
    const { permission } = this.props;
    const permissionData = permission.result.data;
    return (
      <Modal
        title="用户赋权"
        visible={modalVisible}
        width={1040}
        onCancel={() => this.setState({ modalVisible: false })}
        onOk={() => message.success('保存成功')}
      >
        <Row>
          <Col span={18} style={{ height: 600, overflow: 'auto' }}>
            <Collapse activeKey={permissionData.map(item => item.id)}>
              {this.renderPanle(permissionData)}
            </Collapse>
          </Col>
          <Col span={4} offset={2} style={{ height: 600, overflow: 'auto' }}>
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
