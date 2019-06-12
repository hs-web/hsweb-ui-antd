import { Component } from "react";
import React from "react";
import { Modal, Tree, Tabs, Row, Col, Card, Button, message } from "antd";
import { permissionData } from "./permission";

interface SettingPermissionProps {
    settingVisible: () => void;
}

interface SettingPermissionState {

    expandedKeys: string[];
    autoExpandParent: boolean;
    checkedKeys: string[] | { checked: string[]; halfChecked: string[]; };
    selectedKeys: string[],
}


class SettingPermission extends Component<SettingPermissionProps, SettingPermissionState>{

    state = {
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
    }

    onExpand = (expandedKeys: string[]) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = (checkedKeys: string[] | { checked: string[]; halfChecked: string[] }) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    onSelect = (selectedKeys: string[], info: any) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <Tree.TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </Tree.TreeNode>
                );
            }
            // tslint:disable-next-line: jsx-key
            return <Tree.TreeNode {...item} />;
        });


    formatePermission = (data: any) => {
        return data.map(item => {
            const actionList = item.actions.map(action => {
                return {
                    title: action.describe,
                    key: `${item.id}:${action.action}`,
                }
            });
            return {
                title: item.name,
                key: item.id,
                children: actionList,
            }
        });

    }

    save = () => {
        message.success("保存数据");
    }

    render() {
        const { settingVisible } = this.props;
        return (
            <Modal
                visible
                title="用户赋权"
                width={840}
                onCancel={settingVisible}
                onOk={this.save}
            >
                <Tabs defaultActiveKey="permission">
                    <Tabs.TabPane tab="权限设置" key="permission">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Card
                                    title="权限信息"
                                >
                                    <Tree
                                        checkable
                                        onExpand={this.onExpand}
                                        expandedKeys={this.state.expandedKeys}
                                        autoExpandParent={this.state.autoExpandParent}
                                        onCheck={this.onCheck}
                                        checkedKeys={this.state.checkedKeys}
                                        onSelect={this.onSelect}
                                        selectedKeys={this.state.selectedKeys}
                                    >
                                        {this.renderTreeNodes(this.formatePermission(permissionData.result.data))}
                                    </Tree>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card>
                                    数据权限设置 <Button>应用到所有操作</Button>
                                </Card>
                            </Col>
                        </Row>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="菜单设置" key="menu">
                        菜单设置
                    </Tabs.TabPane>
                </Tabs>

            </Modal>
        );
    }
}

export default SettingPermission;
