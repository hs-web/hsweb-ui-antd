import { Component, Fragment } from "react";
import { Form, Modal, Input, Table, message, Tabs, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";
import { connect } from "dva";
import { ColumnProps } from "antd/lib/table";
import { PermissionAction } from "./data";

interface SaveProps extends FormComponentProps {
    dispatch?: Dispatch<any>;
    handleSaveVisible: () => void;
}

interface SaveState {
}
@connect()
class Save extends Component<SaveProps, SaveState>{

    actionColumns: ColumnProps<PermissionAction>[] = [
        {
            title: '操作类型',
            dataIndex: 'action',
        },
        {
            title: '描述',
            dataIndex: 'describe',
        },
        {
            title: '默认选中',
            dataIndex: 'defaultCheck',
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.deleteAction(record)}>删除</a>
                </Fragment>
            ),
        },
    ]

    dataColumns: ColumnProps<>[] = [
        {
            title: '字段',
            dataIndex: '',
        },
        {
            title: '描述',
            dataIndex: '',
        },
        {
            title: '操作',
            render: (text, record) => '删除',
        },
    ];

    componentDidMount() {

    }

    handleSave = () => {
        message.success('保存数据');
    }

    deleteAction = (record: PermissionAction) => {
        message.error("删除数据");
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        const { handleSaveVisible, form: { getFieldDecorator } } = this.props;

        const allSupportDataAccessTypes = [
            { id: 'DENY_FIELDS', text: '禁止访问字段' },
            { id: 'ONLY_SELF', text: '仅限本人' },
            { id: 'POSITION_SCOPE', text: '仅限本人及下属' },
            { id: 'DEPARTMENT_SCOPE', text: '所在部门' },
            { id: 'ORG_SCOPE', text: '所在机构' },
            { id: 'CUSTOM_SCOPE_ORG_SCOPE_', text: '自定义设置-机构' },
            { id: 'CUSTOM_SCOPE_DEPARTMENT_SCOPE_', text: '自定义设置-部门' },
            { id: 'CUSTOM_SCOPE_POSITION_SCOPE_', text: '自定义设置-岗位' },
        ];

        return (
            <Modal
                title="编辑权限"
                className={styles.standardListForm}
                width={840}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Tabs defaultActiveKey="basic">
                    <Tabs.TabPane tab="基本信息" key="basic">

                        <Form {...formItemLayout} layout="vertical">
                            <Form.Item key="id" label="权限标识（ID）" >
                                {getFieldDecorator('id', {
                                })(
                                    <Input placeholder='只能由字母数字下划线组成' />,
                                )}
                            </Form.Item>

                            <Form.Item key="name" label="权限名称" >
                                {getFieldDecorator('name', {
                                })(
                                    <Input />,
                                )}
                            </Form.Item>

                            <Form.Item key="remark" label="备注" >
                                {getFieldDecorator('remark', {
                                })(
                                    <Input />,
                                )}
                            </Form.Item>

                            <Form.Item key="option" label="支持的数据权限控制方式" >
                                {getFieldDecorator('option', {
                                })(
                                    <Select
                                        mode="multiple"
                                    >
                                        {
                                            allSupportDataAccessTypes.map(item =>
                                                <Select.Option value={item.id} key={item.id}>{item.text}</Select.Option>,
                                            )
                                        }
                                    </Select>,
                                )}
                            </Form.Item>

                        </Form>
                        <Table
                            columns={this.actionColumns}
                            dataSource={[]}
                        />

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="数据视图" key="dataView">
                        <Table
                            columns={this.actionColumns}
                            dataSource={[]}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
