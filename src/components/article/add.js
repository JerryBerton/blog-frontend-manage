import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MarkdownEdit from '../resource/index.js';
import * as articlelAction from '../../actions/article';

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
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentWillMount() {
    let category = localStorage.getItem("category");//获取b的值
    category = JSON.parse(Base64.Base64.decode(category));
    this.state.category = category;
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.articleEdit.completed &&
      JSON.stringify(this.props.articleEdit) !== JSON.stringify(nextProps.articleEdit)) {
        message.success("轮播添加成功, 2秒后页面跳转", 2);
        setTimeout(() => {
          this.context.router.push('manage/article/list');
        }, 2000);
      }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
     if (!err) {
       this.props.articlelAction.fetchEdit({
         ...fieldsValue,
         content: this.state.editValue,
         tags: this.state.selectedTags
       });
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
  // 文件上传后的钩子
  handleUploadChange({ file, fileList }) {
    const list = fileList.map((item, index) => {
      return {...item, name: item.response}
    })
    this.setState({
      fileList: list
    })
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
            label="上传图片"
            hasFeedback>
            <Upload
               action="http://127.0.0.1:3000/upload"
               listType="picture"
               fileList={fileList}
               onChange={this.handleUploadChange}>
               <Button type="ghost">
                  <Icon type="upload" /> upload
               </Button>
           </Upload>
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
let CategoryAddForm = Form.create()(CategoryAdd);
export default connect(
  (state) => {
    return {
      articleEdit: state.article.edit,
    };
  },
  (dispatch) => {
    return {
      articlelAction: bindActionCreators(articlelAction, dispatch)
    };
  }
)(CategoryAddForm)
