import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Button, Form, message, Input, Upload, Icon, Modal, Select, Tag, Radio} from 'antd';
import Base64 from 'js-base64';
class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      category: [],
      tags: [],
      selectedTags: [],
      editValue: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentWillMount() {
    let category = localStorage.getItem("category");//获取b的值
    category = JSON.parse(Base64.Base64.decode(category));
    this.state.category = category;
    this.state.editValue = this.props.data.content;
  }
  componentDidMount() {
    console.log('dsss', this.props.data);
  }
  componentWillReceiveProps(nextProps) {

    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {

    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
     if (!err) {

     }
    });
  }
  handleEditChange(value) {
    this.setState({ editValue: value});
  }
  // tag 选中时
  handleTagChange(id, checked) {
    const { selectedTags } = this.state;
    let nextSelectedTags = [];
    if (checked) {
      nextSelectedTags = [...selectedTags, id]
    } else {
      nextSelectedTags = selectedTags.filter(t =>  t !== id);
    }
    this.setState({ selectedTags: nextSelectedTags });
  }
  // 下拉框改变时
  handleSelectChange(value) {
    let result = this.state.category.find(item => item.id === parseInt(value));
    if (result) {
      this.setState({ tags: result.tags });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList, category, tags, selectedTags } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return(
      <div className="common-pannel" >
        <Form horizontal onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="标题"
            hasFeedback>
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '文章标题必须传',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="分类选择"
            hasFeedback>
            {getFieldDecorator('categoryId', {
              rules: [{
                required: true, message: '必须选择文章分类',
              }],
            })(
              <Select placeholder="请选择一个分类" onChange={this.handleSelectChange}>
                {
                  category.map(item => (
                    <Select.Option value={item.id.toString()} key={item.id}>{item.name}</Select.Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="标签选择"
            hasFeedback>
            {
              tags.map(tag => (
                <Tag.CheckableTag
                  checked={selectedTags.indexOf(tag.id) > -1}
                  onChange={checked => this.handleTagChange(tag.id, checked)}
                  key={tag.id}>
                  {tag.name}
                </Tag.CheckableTag>
              ))
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="描述信息"
            hasFeedback>
            {getFieldDecorator('description', {
              rules: [{
                required: true, message: '信息描述必须填写',
              }],
            })(
              <Input type="textarea"/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="是否发布">
            {getFieldDecorator('radio-group')(
             <Radio.Group>
               <Radio value="1">是</Radio>
               <Radio value="0">否</Radio>
             </Radio.Group>
            )}
           </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="描述信息"
            hasFeedback>
           <SimpleMDE
            value={this.state.editValue}
            onChange={this.handleEditChange}
           />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button type="primary" htmlType="submit" size="large">提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
CategoryAdd.contextTypes = {
  router: React.PropTypes.object
}

export default Form.create()(CategoryAdd)
