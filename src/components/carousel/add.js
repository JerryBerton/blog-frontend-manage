import React from 'react';
import { Form, Upload, Button, Icon, Input, Modal, message } from 'antd';
class CarouselAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }
  handleUpload(info) {
    const status = info.file.status;
    if (status === 'done') {
      this.setState({
        file: info.file
      });
    } else if (status === 'error') {
      message.error('上传失败')
    }
  }
  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          ...values,
          url: this.state.file.response[0].url
        }
        this.props.onSubmit(data);
      }
    });
  }
  handleCancel() {
    this.props.form.resetFields();
    this.props.onCancel();
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    return (
      <Modal
        title="Basic Modal"
        visible={this.props.visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
      >
        <Form horizontal>
          <Form.Item
            {...formItemLayout}
            label="标题"
            hasFeedback
          >
            {getFieldDecorator('label', {
              rules: [{
                required: true, message: '请输入轮播标题',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="上传"
            extra=""
          >
          <Upload
            name="logo"
            action="http://127.0.0.1:3000/upload"
            onChange={this.handleUpload.bind(this)}>
            <Button type="ghost">
              <Icon type="upload" /> 选择图片
            </Button>
          </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(CarouselAdd)
