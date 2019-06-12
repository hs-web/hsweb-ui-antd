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

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const { form: { getFieldDecorator }, handleSaveVisible } = this.props;
        return (
            <Modal
                title="编辑角色"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="角色标识（ID）" >
                        {getFieldDecorator('id', {
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="name" label="角色名称" >
                        {getFieldDecorator('name', {
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="remark" label="备注" >
                        {getFieldDecorator('remark', {
                        })(
                            <Input.TextArea rows={2} />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
