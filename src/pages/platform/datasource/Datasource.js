import React from 'react'
import { Table, Icon, Divider, Button, message } from 'antd'
import DatasourceModel from './DatasourceModal'
import ajax from '../../../utils/ajax'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      total: 0,
      datasources: [],
      formData: null,
      isEdit: false,
    }
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a href="#" onClick={() => this.startUpdate(record)}>{text}</a>,
      }, {
        title: '数据库',
        dataIndex: 'url',
        key: 'url'
      }, {
        title: '店铺数',
        dataIndex: 'tenantCount',
        key: 'tenantCount'
      } ];
  }

  componentDidMount() {
    this.refresh();
  }

  showModal = (record = {}) => {
    this.setState({
      visible: true,
      isEdit: !!record.id,
      formData: record
    });
  }
  startUpdate = (record) => {
    this.showModal(record)
  }
  handleCreate = (isEdit) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var _this = this;
      ajax({
        url: "/api/platform/datasource",
        method: isEdit ? "put" : "post",
        data: {
          ...values
        },
        success(resp) {
          _this.refresh();
          form.resetFields();
          _this.setState({ visible: false });
        }, error(e) {

        }
      })
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  refresh = (pageIndex = 1, pageSize = 10) => {
    var _this = this;
    ajax({
      url: `/api/platform/datasource?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      success(resp) {
        let data = resp.data;
        _this.setState({ datasources: data.data, total: data.total })
      },
      error(e) {
      }
    })
  }
  onPageChange = (page, pageSize) => {
    this.refresh(page, pageSize);
  }

  showTotal = () => {
    return "总数:" + this.state.total;
  }

  generateOrder = () => {
    ajax({
      url: "/api/tenant/orders",
      method:"post",
      data: {
        id: Math.random(),
        vipId: "xx"
      },
      success() {

      },
      error() {

      }
    })
  }

  render() {
    const { datasources, total } = this.state;
    return (
      <div>
        <Button type="primary" className="" onClick={this.showModal}>新增</Button>
        <Button type="primary" className="" onClick={this.generateOrder}>haha</Button>
        <Table rowKey={record => record.id} columns={this.columns} dataSource={datasources}
               pagination={{
                 size: "small",
                 total: total,
                 showQuickJumper: true,
                 showTotal: this.showTotal,
                 showSizeChanger: true,
                 hideOnSinglePage: true,
                 onChange: this.onPageChange,
                 onShowSizeChange: this.onPageChange
               }}/>
        <DatasourceModel
          formData={this.state.formData}
          isEdit={this.state.isEdit}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }

}