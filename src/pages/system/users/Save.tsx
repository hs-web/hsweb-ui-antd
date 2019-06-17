import { Component } from 'react';
import { Form, Modal, Input, Table, message, Row, Col, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import styles from '../style.less';
import { ColumnProps } from 'antd/lib/table';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { RoleItem } from '../role/data';
import { UserItem } from './data';

interface SaveProps extends FormComponentProps {
  dispatch?: Dispatch<any>;
  handleSaveVisible: () => void;
  handleSave: (item: UserItem) => void;
  currentItem: UserItem;
}

interface SaveState {
  roleList: RoleItem[];
  loading: boolean;
  item: UserItem;
  selectedRowKeys: any;
}
@connect()
class Save extends Component<SaveProps, SaveState> {
  state: SaveState = {
    roleList: [],
    loading: false,
    item: { id: '' },
    selectedRowKeys: [],
  };

  columns: ColumnProps<any>[] = [
    {
      title: '角色名',
      dataIndex: 'name',
      align: 'center',
    },
  ];

  roleSelection = {
    onChange: (selectedRowKeys: string[] | number[], selectedRows: any[]) => {
      this.setState({
        selectedRowKeys,
      });
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    // getCheckboxProps: record => ({
    //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //     name: record.name,
    // }),
  };

  componentDidMount() {
    const { dispatch, currentItem } = this.props;

    if (dispatch) {
      dispatch({
        type: 'role/fetch',
        callback: (response: any) => {
          if (response.status === 200) {
            const data = response.result.data;
            this.setState({
              roleList: data,
            });
          }
        },
      });

      if (currentItem.id !== '' || currentItem.id) {
        message.success(currentItem.id + '用户ID');
        dispatch({
          type: 'users/fetchById',
          payload: currentItem.id,
          callback: (response: any) => {
            this.setState({
              loading: true,
              item: response.result,
              selectedRowKeys: response.result.roles,
            });
          },
        });
      } else {
        this.setState({
          loading: true,
        });
      }
    } else {
      message.success('系统错误');
    }
  }

  handleSave = () => {
    const { form, handleSave } = this.props;
    const { selectedRowKeys } = this.state;
    form.validateFields((err, fieldValue) => {
      if (err) return;
      handleSave({ ...fieldValue, roles: selectedRowKeys }); //保存数据
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      currentItem,
      handleSaveVisible,
    } = this.props;
    const { roleList, loading, item, selectedRowKeys } = this.state;
    return (
      <Modal
        title={currentItem.id !== '' ? '编辑用户' : '新建用户'}
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}
      >
        {loading === true ? (
          <div>
            <Form layout="vertical">
              <Row gutter={4}>
                <Col>
                  <Form.Item
                    key="name"
                    label="姓名"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                  >
                    {getFieldDecorator('name', {
                      initialValue: item.name,
                    })(<Input placeholder="请输入姓名" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={4}>
                <Col span={11}>
                  <Form.Item
                    key="username"
                    label="用户名"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('username', {
                      initialValue: item.username,
                    })(<Input placeholder="请输入用户名" />)}
                  </Form.Item>
                </Col>
                <Col span={11} offset={2}>
                  <Form.Item
                    key="password"
                    label="密码"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('password', {
                      initialValue: '**********',
                    })(<Input placeholder="*********" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item key="remark" label="备注" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                {getFieldDecorator('remark', {
                  initialValue: item.remark,
                })(<Input.TextArea rows={2} />)}
              </Form.Item>
            </Form>
            <Table
              rowSelection={{ ...this.roleSelection, selectedRowKeys }}
              columns={this.columns}
              dataSource={roleList}
              rowKey={record => record.id}
            />
          </div>
        ) : (
          <Spin style={{ marginLeft: 250 }} tip="Loading..." />
        )}
      </Modal>
    );
  }
}

export default Form.create<SaveProps>()(Save);
