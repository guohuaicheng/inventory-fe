import React from 'react'
import { Table, Icon, Divider, Button } from 'antd'
import TenantModel from './TenantModal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../../actions/platform/TenantAction'
import * as Constant from "../../../constants/TenantConstants"
import axios from 'axios'
import ajax from '../../../utils/ajax'

@connect(
    (state) => ({
        tenants: state.tenant.tenants
    }), (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            tenants: [],
            formValue: null
        }
        this.columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '数据源',
            dataIndex: 'datasourceId',
            key: 'datasourceId'
        }];
    }
    componentDidMount() {
        this.refresh();
    }
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    refresh = () => {
        var _this = this;
        ajax({
            url: "/api/platform/tenants",
            success(resp) {
                _this.setState({ tenants: [{ key: 1, id: 1, datasourceId: 1 }] })

            },
            error(e) {
                _this.setState({ tenants: [{ key: 1, id: 1, datasourceId: 1 }] })
            }
        })
    }
    refresh1 = () => {
        this.setState({
            formValue: { name: "2", datasourceId: 1, description: "xx2xx" }, visible: true
        })
    }
    render() {
        const data = this.state.tenants;
        // if (data) {
        //     for (var i = 0, l = data.length; i < l; i++) {
        //         data[i].rowKey = i;
        //     }
        // }
        var vvv = this.state.formValue || { name: "1", datasourceId: 1, description: "xxxx" };
        return (
            <div>
                <Button type="primary" className="" onClick={this.showModal}>新增</Button>
                <Button type="primary" className="" onClick={this.refresh}>刷新</Button>
                <Button type="primary" className="" onClick={this.refresh1}>刷新1</Button>
                <Table columns={this.columns} dataSource={data} />
                <TenantModel
                    value={vvv}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }

}