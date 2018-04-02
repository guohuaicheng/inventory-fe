import React from 'react'
import { Button, Modal, Form, Input, Select, Row, Col } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import ajax from '../../../utils/ajax'


@Form.create({})
export default class App extends React.Component {
    state = {
        showMore: false
    }

    toggleShowMore = () => {
        const { showMore } = this.state;
        this.setState({ showMore: !showMore });
    }
    render() {
        let formData = this.props.formData || {};
        const { visible, onCancel, onCreate, form, isEdit } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            }
        };
        const showMore = this.state.showMore;
        const i = 0;
        return (
            <Modal
                maskClosable={false}
                visible={visible}
                title={isEdit ? "编辑" : "新增"}
                onCancel={onCancel}
                onOk={() => { onCreate(isEdit ? 1 : 0) }}
                okText="确认"
                cancelText="取消"
                style={{ top: 20 }}
                footer={[
                    // <Button key="showMore" onClick={this.toggleShowMore}>{showMore ? '隐藏更多' : '显示更多'}</Button>,
                    <Button key="test">测试连接</Button>,
                    <Button key="back" onClick={this.props.onCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.props.onCreate}>
                        保存
                    </Button>

                ]}
            >{
                    visible ? <Form layout="horizontal">
                        <Row>
                            <Col span={12}>
                                <FormItem label="名称"  >
                                    {getFieldDecorator('name', {
                                        initialValue: formData.name,
                                        rules: [{ required: true, message: '请输入数据源名称' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="驱动"  >
                                    {getFieldDecorator('driver', {
                                        initialValue: formData.driver || "com.mysql.jdbc.Driver"
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label="数据库" >
                                    {getFieldDecorator('url', {
                                        initialValue: formData.url || "jdbc:mysql://127.0.0.1:3306/dbname",
                                        rules: [{ required: true, message: '请输入数据库' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="用户名"  >
                                    {getFieldDecorator('user', {
                                        initialValue: formData.user || "root",
                                        rules: [{ required: true, message: '请输入用户名' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="密码" >
                                    {getFieldDecorator('password', {
                                        initialValue: formData.password || "",
                                        rules: [{ required: true, message: '请输入密码' }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label="描述">
                                    {getFieldDecorator('description', {
                                        initialValue: formData.description
                                    })(<Input.TextArea rows="2" />)}
                                </FormItem>
                            </Col>
                            <Col span={8} style={{ display: showMore ? 'block' : 'none' }}>
                                <FormItem label="maxPoolSize" {...formItemLayout}>
                                    {getFieldDecorator('maxPoolSize', {
                                        initialValue: formData.maxPoolSize || 15,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8} style={{ display: showMore ? 'block' : 'none' }}>
                                <FormItem label="minPoolSize" {...formItemLayout}>
                                    {getFieldDecorator('minPoolSize', {
                                        initialValue: formData.minPoolSize || 3,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8} style={{ display: showMore ? 'block' : 'none' }}>
                                <FormItem label="checkoutTimeout" {...formItemLayout}>
                                    {getFieldDecorator('checkoutTimeout', {
                                        initialValue: formData.checkoutTimeout || 1000,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8} style={{ display: showMore ? 'block' : 'none' }}>
                                <FormItem label="initialPoolSize" {...formItemLayout}>
                                    {getFieldDecorator('initialPoolSize', {
                                        initialValue: formData.initialPoolSize || 3,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8} style={{ display: showMore ? 'block' : 'none' }}>
                                <FormItem label="maxIdleTime" {...formItemLayout}>
                                    {getFieldDecorator('maxIdleTime', {
                                        initialValue: formData.maxIdleTime || 100,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8} style={{ display: showMore ? 'block' : 'none' }}>
                                <FormItem label="acquireIncrement" {...formItemLayout}>
                                    {getFieldDecorator('acquireIncrement', {
                                        initialValue: formData.acquireIncrement || 3,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form> : ""
                }
            </Modal>
        );
    }
}