import { Component } from "react";
import { Form, Modal, Input, Table, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { ColumnProps } from "antd/lib/table";
import { Dispatch } from "redux";
import { connect } from "dva";
import { RoleItem } from "../role/data";

interface SaveProps extends FormComponentProps {
    dispatch?: Dispatch<any>;
    handleSaveVisible: () => void;
}

interface SaveState {
    roleList: RoleItem[];
}
@connect()
class Save extends Component<SaveProps, SaveState>{

    state: SaveState = {
        roleList: [],
    }

    columns: ColumnProps<any>[] = [
        {
            title: '角色名',
            dataIndex: 'name',
            align: 'center',
        },
    ];

    roleSelection = {
        onChange: (selectedRowKeys: string[] | number[], selectedRows: any[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    }

    componentDidMount() {
        const { dispatch } = this.props;
        console.log('save', dispatch);
        dispatch({
            type: 'role/fetch',
            callback: (response: any) => {
                if (response.status === 200) {
                    this.setState({
                        roleList: response.result.data,
                    })
                }
            },
        });
    }

    handleSave = () => {
        message.success('保存数据');
    }

    render() {
        const data = [
            {
                key: '1',
                name: '超级管理员',
            },
            {
                key: '2',
                name: '渗透岗',
            },
            {
                key: '3',
                name: 'SEO',
            },
        ];

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const { form: { getFieldDecorator }, handleSaveVisible } = this.props;
        return (
            <Modal
                title="编辑用户"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="name" label="姓名" >
                        {getFieldDecorator('name', {
                        })(
                            <Input placeholder='请输入姓名' />,
                        )}
                    </Form.Item>
                    <Form.Item key="username" label="用户名" >
                        {getFieldDecorator('username', {
                        })(
                            <Input placeholder='请输入用户名' />,
                        )}
                    </Form.Item>
                    <Form.Item key="password" label="密码" >
                        {getFieldDecorator('password')(
                            <Input placeholder='*********' />,
                        )}
                    </Form.Item>
                    <Form.Item key="remark" label="备注" >
                        {getFieldDecorator('remark', {
                        })(
                            <Input.TextArea rows={2} />,
                        )}
                    </Form.Item>
                </Form>
                <Table
                    rowSelection={this.roleSelection}
                    columns={this.columns}
                    dataSource={data}
                />
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
