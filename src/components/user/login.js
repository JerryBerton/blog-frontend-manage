import React from 'react';
import './index.scss';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { setCookie } from '../../tool/cookie.js';
class UserLogin extends React.Component {
  constructor(props) {
    super(props)
    setCookie('token', 'wjb', 10);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="user-box">
        <div className="login-panle">
          <Form
            onSubmit={this.handleSubmit}
            className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input placeholder="账号" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input type="password" placeholder="口令" />
              )}
            </Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Log in
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
export default Form.create()(UserLogin);
