import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../actions/user';

import './index.scss';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { setCookie } from '../../tool/cookie.js';
class UserLogin extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.login.completed &&
      JSON.stringify(nextProps.login) !== JSON.stringify(this.props.login)) {
        let userToken = nextProps.login.result;
        setCookie('usertoken', userToken);
        this.context.router.push('manage');
      }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userAction.fetchLogin(values);
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="user-box">
        <div className="login-panle">
          
          <Form
            onSubmit={this.handleSubmit.bind(this)}
            className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
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
              login
              <Icon type="arrow-right" />
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
UserLogin.contextTypes = {
  router: React.PropTypes.object
}
export default connect(
  (state) => {
    return {
      login: state.user.login
    };
  },
  (dispatch) => {
    return {
      userAction: bindActionCreators(userAction, dispatch)
    };
  }
)(Form.create()(UserLogin))
