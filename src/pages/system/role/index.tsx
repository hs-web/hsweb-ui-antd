import React, { Component, Fragment } from "react";
import { Dispatch } from "redux";
import { RoleModelState } from "../../../models/role";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { ColumnProps } from "antd/lib/table";
import { RoleItem } from "./data";
import { Divider, Card, Table } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import styles from "../style.less";
import Search from "./Search";
import Save from "./Save";
import SettingPermission from "../permission/SettingPermission";

interface RoleProps {
    dispatch: Dispatch<any>;
    loading: boolean;
    role: RoleModelState;
}

interface RoleState {
    saveVisible: boolean;
    settingVisible: boolean;
    searchParams: { [key: string]: string }
}

@connect(({ role, loading }: ConnectState) => ({
    role,
    loading: loading.models.role,
}))
class Role extends Component<RoleProps, RoleState>{

    state: RoleState = {
        saveVisible: false,
        settingVisible: false,
        searchParams: {},
    }

    columns: ColumnProps<RoleItem>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '是否启用',
            dataIndex: 'status',
        },
        {
            title: '备注',
            dataIndex: 'describe',
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
            type: 'role/fetch',
        });
    }

    edit = (record: RoleItem) => {
        this.setState({
            saveVisible: true,
        })
    }

    setting = (record: RoleItem) => {
        this.setState({
            settingVisible: true,
        })
    }

    render() {
        const { role: { result }, loading } = this.props;
        const { saveVisible, settingVisible } = this.state;
        return (
            <PageHeaderWrapper title="角色管理">
                <Card bordered={false}>
                    <div className={styles.tableListForm}><Search /></div>
                    <Table
                        loading={loading}
                        dataSource={result.data}
                        columns={this.columns}
                        rowKey={item => item.id}
                    />
                </Card>
                {
                    saveVisible && <Save handleSaveVisible={() => this.setState({ saveVisible: false })} />
                }
                {
                    settingVisible && <SettingPermission settingVisible={() => this.setState({ settingVisible: false })} />
                }
            </PageHeaderWrapper>
        );
    }
}

export default Role;
