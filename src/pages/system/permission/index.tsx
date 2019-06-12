import React, { Component, Fragment } from "react";
import { Dispatch } from "redux";
import { PermissionModelState } from "@/models/permission";
import { connect } from "dva";
import { ConnectState } from "@/models/connect";
import { PermissionItem } from "./data";
import { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Table } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import styles from "../style.less";
import Search from "./Search";
import Save from "./Save";

interface PermissionProps {
    dispatch: Dispatch<any>;
    loading: boolean;
    permission: PermissionModelState;
}
interface PermissionState {
    saveVisible: boolean;
    searchParams: { [key: string]: string };
}
@connect(({ permission, loading }: ConnectState) => ({
    permission,
    loading: loading.models.permission,
}))
class Permission extends Component<PermissionProps, PermissionState>{

    state: PermissionState = {
        saveVisible: false,
        searchParams: {},
    }

    columns: ColumnProps<PermissionItem>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text) => text === 1 ? '正常' : '禁用',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.edit(record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.delete(record)}>删除</a>
                </Fragment>
            ),
        },
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'permission/fetch',
        });
    }

    edit = (record: PermissionItem) => {
        this.setState({
            saveVisible: true,
        });
        message.success("编辑");
    }

    delete = (record: PermissionItem) => {
        message.error("删除数据");
    }

    render() {
        const { permission: { result }, loading } = this.props;
        const { saveVisible } = this.state;
        return (
            <PageHeaderWrapper title="权限管理">
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
            </PageHeaderWrapper>
        );
    }
}

export default Permission;
