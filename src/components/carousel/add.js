import React from 'react';
import { Form, Upload, Button, Icon, Input } from 'antd';
class CarouselAdd extends React.Component {
  constructor(props) {
    super(props);
  }
  handleUpload(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log('done', info.file.response);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
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
      <Form horizontal onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="标题"
          hasFeedback
        >
          {getFieldDecorator('name', {
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
          listType="picture"
          onChange={this.handleUpload.bind(this)}>
          <Button type="ghost">
            <Icon type="upload" /> 选择图片
          </Button>
        </Upload>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(CarouselAdd)