import React, { Component } from 'react';
import {
  Modal,
  Row,
  Col,
  message,
  Affix,
  Anchor,
  Collapse,
  Select,
  Icon,
  Switch,
  Divider,
  Checkbox,
  Radio,
  Button,
} from 'antd';
const { Link } = Anchor;
const { Panel } = Collapse;
const { Option } = Select;

interface SettingAutzProps {}

interface SettingAutzState {
  modalVisible: boolean;
}

class SettingAutz extends Component<SettingAutzProps, SettingAutzState> {
  state: SettingAutzState = {
    modalVisible: true,
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <Modal
        title="用户赋权"
        visible={modalVisible}
        width={1040}
        onCancel={() => this.setState({ modalVisible: false })}
        onOk={() => message.success('保存成功')}
      >
        <Row>
          <Col span={18}>
            <Collapse
              activeKey={['role', 'user']}
              // defaultActiveKey={['1']}
              onChange={() => console.log('ssss')}
              // expandIconPosition={'right'}
            >
              <Panel
                header="用户管理"
                key="user"
                extra={
                  <div>
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
                    <Divider type="vertical" />
                    <a href="#">数据权限</a>
                    <Divider type="vertical" />
                    <a href="#">字段权限</a>
                  </div>
                }
              >
                <div>
                  <Checkbox.Group>
                    <Row>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="ALL">全选</Checkbox>
                        <Divider type="vertical" />
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="A" style={{ width: 200 }}>
                          新增
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="B" style={{ width: 200 }}>
                          修改
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="C" style={{ width: 200 }}>
                          删除
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="D" style={{ width: 200 }}>
                          查询列表
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="E" style={{ width: 200 }}>
                          查询详情
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="C">删除</Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="D">查询列表</Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="E">查询详情</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </div>
              </Panel>
              <Panel
                header="权限管理"
                key="permission"
                extra={
                  <div>
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" />
                    <Divider type="vertical" />
                    <a href="#">数据权限</a>
                    <Divider type="vertical" />
                    <a href="#">字段权限</a>
                  </div>
                }
              >
                <div>
                  {/* <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                        <Radio.Group onChange={() => { }} value={1}>
                                            <Radio value={1}>全选</Radio>
                                            <Radio value={2}>反选</Radio>
                                        </Radio.Group>
                                    </div>
                                    <br /> */}
                  <Checkbox.Group
                    options={['全选', '修改', '删除', '查询']}
                    value={['全选', '删除', '查询']}
                    onChange={() => {}}
                  />
                </div>
              </Panel>
              <Panel
                header="角色管理"
                key="role"
                extra={
                  <div>
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
                    <Divider type="vertical" />
                    <a href="#">数据权限</a>
                    <Divider type="vertical" />
                    <a href="#">字段权限</a>
                  </div>
                }
              >
                <div>
                  <Checkbox.Group>
                    <Row>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="ALL">全选</Checkbox>
                        <Divider type="vertical" />
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="A" style={{ width: 200 }}>
                          新增
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="B" style={{ width: 200 }}>
                          修改
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="C" style={{ width: 200 }}>
                          删除
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="D" style={{ width: 200 }}>
                          查询列表
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="E" style={{ width: 200 }}>
                          查询详情
                        </Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="C">删除</Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="D">查询列表</Checkbox>
                      </Col>
                      <Col span={6} style={{ height: 40 }}>
                        <Checkbox value="E">查询详情</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </div>
              </Panel>
            </Collapse>
          </Col>
          <Col span={4} offset={2}>
            <Affix>
              <Anchor>
                <Link href="#components-anchor-demo-basic" title="用户管理" />
                <Link href="#components-anchor-demo-static" title="角色管理" />
                <Link href="#API" title="系统设置">
                  <Link href="#Anchor-Props" title="权限管理" />
                  <Link href="#Link-Props" title="菜单管理" />
                </Link>
              </Anchor>
            </Affix>
          </Col>
        </Row>
      </Modal>
    );
  }
} //天高鸿苑 3-10-3
export default SettingAutz;
