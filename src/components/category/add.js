import React from 'react';
import { Modal, Form, Input, Card, Tag, Button } from 'antd';
class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
  }
  handleOk() {
    this.props.form.validateFields((err, values) => {
     if (!err) {
       this.props.onSubmit({
         ...values,
         tags: this.state.tags
       });
     }
   });
  }
  handleCancel() {
    this.props.onCancel();
  }
  handleClose(removedTag) {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }

  showInput() {
    this.setState(
      { inputVisible: true },
      () => this.input.focus());
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm() {
    const inputValue = this.state.inputValue;
    let tags = this.state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input
  render() {
    const { getFieldDecorator } = this.props.form;
    const { tags, inputVisible, inputValue } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <Modal
        title="添加分类"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <Form horizontal>
          <Form.Item
            {...formItemLayout}
            label="分类名称"
            hasFeedback>
            { getFieldDecorator('name', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="标签添加"
            hasFeedback>
            <Card bodyStyle={{padding: 6}}>
            {
              tags.map((tag, index) => (
                <Tag key={tag}
                  closable={true}
                  afterClose={() => this.handleClose(tag)}>
                  {tag}
                </Tag>
              ))
            }
            {
              inputVisible &&
              (
              <Input
                ref={this.saveInputRef}
                type="text" size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {
              !inputVisible &&
              <Button size="small" type="dashed" onClick={this.showInput}>+ 添加</Button>
            }
            </Card>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(CategoryAdd);
