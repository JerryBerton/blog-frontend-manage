import React from 'react';
import { connect } from 'react-redux';

import { Button, Table, Form, Input } from 'antd';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="index">
        <Form inline onSubmit={this.handleSubmit}>
          <Form.Item>
             {getFieldDecorator('name', {
               rules: [{ required: true, message: 'Please input your username!' }],
             })(
               <Input placeholder="输入添加的名字" />
             )}
          </Form.Item>
          <Form.Item>
             {getFieldDecorator('age', {
               rules: [{ required: true, message: 'Please input your Password!' }],
             })(
               <Input placeholder="输入添加的年龄" />
             )}
          </Form.Item>
          <Form.Item>
             <Button type="primary" htmlType="submit">添加</Button>
          </Form.Item>
        </Form>
        <div className="test">

         </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default Form.create()(AppComponent);
