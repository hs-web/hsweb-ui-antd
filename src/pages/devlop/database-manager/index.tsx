import React, { Component } from "react";
import { Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

interface DatabaseManagerProps {

}

interface DatabaseManagerState {

}

class DatabaseManager extends Component<DatabaseManagerProps, DatabaseManagerState>{

    render() {
        return (
            <PageHeaderWrapper title="数据库维护">
                <Card bordered={false}>
                    数据库维护
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default DatabaseManager;
