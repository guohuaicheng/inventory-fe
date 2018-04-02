import React from 'react'
import { Button, Modal, Form, Input, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import ajax from '../../../utils/ajax'

class CSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || 2,
            options: []
        }
    }
    componentDidMount() {
        ajax({
            url: "/api/datasource",
            success: (resp) => {

            },
            error: (e) => {
                this.setState({ options: [{ id: 1, text: "Jack2" }, { id: 2, text: "Jack3" }] })
            }
        })
    }
    getOptions = () => {
        const { options } = this.state;
        if (options && options.length) {
            var o = [];
            for (let i = 0, l = options.length; i < l; i++) {
                let option = options[i];
                o.push(
                    <Option key={option.id} value={option.id}>{option.text}</Option>
                )
            }
            return o;
        }
        return [];
    }

    handleChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        return (
            <Select
                showSearch
                value={this.state.value}
                placeholder="选择数据源"
                optionFilterProp="children"
                // onChange={handleChange}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {this.getOptions()}
            </Select>
        )
    }
}

@Form.create({})
export default class App extends React.Component {
    checkDatasource = (rule, value, callback) => {
        if (value !== undefined && value !== null) {
            callback();
            return;
        }
        callback('请选择数据源');
    }

    checkPrice = (rule, value, callback) => {
        if (value.number > 0) {
            callback();
            return;
        }
        callback('Price must greater than zero!');
    }

    render() {
        const { visible, onCancel, onCreate, form } = this.props;
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
        var maskClosable = false;
        var props = this.props.value;
        return (
            <Modal
                maskClosable={maskClosable}
                visible={visible}
                title="Create a new collection"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
                okText="确认"
                cancelText="取消"
            >{
                    visible ? <Form layout="horizontal">

                        <FormItem label="租户名称"  {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: props.name,
                                rules: [{ required: true, message: '请输入租户名称' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="数据源">
                            {getFieldDecorator('datasourceId', {
                                initialValue: props.datasourceId,
                                rules: [{ required: true, message: '请选择数据源' }],
                            })(
                                <CSelect />
                            )}
                        </FormItem>

                        <FormItem label="描述">
                            {getFieldDecorator('description', {
                                initialValue: props.description
                            })(<Input type="textarea" />)}
                        </FormItem>
                    </Form> : ""
                }

            </Modal>
        );
    }
}