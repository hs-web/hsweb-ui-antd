import React, { Component, Fragment } from 'react';
import { Dispatch } from 'redux';
import { UserItem } from './data';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { Divider, Table, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ConnectState from '@/models/connect';
import styles from '../style.less';
import Search from './Search';
import Save from './Save';
import SettingPermission from '../permission/SettingPermission';
import { UsersModelState } from '@/models/users';

interface UserProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  users: UsersModelState;
}
interface UserState {
  saveVisible: boolean;
  settingVisible: boolean;
  searchParams: { [key: string]: string };
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
    });
  };

  setting = (record: UserItem) => {
    this.setState({
      settingVisible: true,
    });
  };

  render() {
    const {
      users: { result },
      loading,
    } = this.props;
    const { saveVisible, settingVisible } = this.state;
    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Search />
          </div>
          <Table
            loading={loading}
            dataSource={result.data}
            columns={this.columns}
            rowKey={item => item.id}
          />
        </Card>
        {saveVisible && <Save handleSaveVisible={() => this.setState({ saveVisible: false })} />}
        {settingVisible && (
          <SettingPermission settingVisible={() => this.setState({ settingVisible: false })} />
        )}
      </PageHeaderWrapper>
    );
  }
}

export default Users;
