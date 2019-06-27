import React, { Component, Fragment } from 'react';
import { Dispatch } from 'redux';
import { UserItem } from './data';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { Divider, Table, Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ConnectState from '@/models/connect';
import styles from '../style.less';
import Search from './Search';
import Save from './Save';
import SettingPermission from '../permission/SettingPermission';
import { UsersModelState } from '@/models/users';
import SettingAutz from '@/components/SettingAutz';

interface UserProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  users: UsersModelState;
}
interface UserState {
  saveVisible: boolean;
  settingVisible: boolean;
  searchParams: { [key: string]: string };
  currentItem: UserItem;
}
@connect(({ users, loading }: ConnectState) => ({
  users,
  loading: loading.models.users,
}))
class Users extends Component<UserProps, UserState> {
  state: UserState = {
    saveVisible: false,
    settingVisible: false,
    searchParams: {},
    currentItem: { id: '' },
  };

  columns: ColumnProps<UserItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      render: text => (text === 1 ? '是' : '否'),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.edit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>赋权</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/fetch',
    });
  }

  edit = (record: UserItem) => {
    this.setState({
      saveVisible: true,
      currentItem: record,
    });
  };

  setting = (record: UserItem) => {
    this.setState({
      settingVisible: true,
      currentItem: record,
    });
  };

  save = (record: UserItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/add',
      payload: record,
      callback: (response: any) => {
        if (response.status === 200) {
          message.success('保存成功');
        }
      },
    });
  };

  render() {
    const {
      users: { result },
      loading,
    } = this.props;
    const { saveVisible, settingVisible, currentItem } = this.state;
    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Search handleModalVisible={() => this.setState({ saveVisible: true })} />
          </div>
          <Table
            loading={loading}
            dataSource={result.data}
            columns={this.columns}
            rowKey={item => item.id}
          />
        </Card>
        {saveVisible && (
          <Save
            handleSaveVisible={() => this.setState({ saveVisible: false, currentItem: { id: '' } })}
            handleSave={(item: UserItem) => this.save(item)}
            currentItem={currentItem}
          />
        )}
        {settingVisible && (
          <SettingAutz
            settingVisible={() => this.setState({ settingVisible: false })}
            settingId={currentItem.id}
            settingType={'user'}
          />
          // <SettingPermission
          //   settingVisible={() => this.setState({ settingVisible: false })}
          //   settingType={'user'}
          //   settingId={currentItem.id}
          // />
        )}
      </PageHeaderWrapper>
    );
  }
}

export default Users;
