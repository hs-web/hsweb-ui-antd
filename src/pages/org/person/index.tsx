import React, { Component } from "react";
import { Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

interface PersonProps {

}

interface PersonState {

}

class Person extends Component<PersonProps, PersonState>{

    render() {
        return (
            <PageHeaderWrapper title="人员管理">
                <Card bordered={false}>
                    人员管理
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default Person;
