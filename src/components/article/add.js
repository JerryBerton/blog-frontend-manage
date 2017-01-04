import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MarkdownEdit from '../resource/index.js';
import * as articlelAction from '../../actions/article';
import * as categoryAction from '../../actions/category';

import SimpleMDE from 'react-simplemde-editor';
import { Button, Form, message, Input, Upload, Icon, Modal, Select, Radio} from 'antd';
import Base64 from 'js-base64';
class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      editValue: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
  }
  componentWillMount() {
    const { location } = this.props;
    this.props.categoryAction.fetchList({isPage: 1});
    if (location.query.type === 'mod') {
      let id = location.query.id;
      this.props.articlelAction.fetchDetail(id);
    }
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (nextProps.articleEdit.completed &&
      JSON.stringify(this.props.articleEdit) !== JSON.stringify(nextProps.articleEdit)) {
        message.success("轮播添加成功, 2秒后页面跳转", 2);
        setTimeout(() => {
          this.context.router.push('manage/article/list');
        }, 2000);
      }
    // 如果 type = mod 代表是编辑
    if (location.query.type === 'mod' && nextProps.articleDetail.completed &&
      JSON.stringify(this.props.articleDetail) !== JSON.stringify(nextProps.articleDetail)) {
        let detail = {...nextProps.articleDetail.result};
        detail.categoryId = detail.categoryId && detail.categoryId.toString();
        this.state.editValue = detail.content;
        this.props.form.setFieldsValue(detail);
    }

    // if (location.query.type === 'new')  {
    //   console.log(12321);
    //   this.props.form.resetFields();
    //   this.state.editValue = null;
    // }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
     if (!err) {
       this.props.articlelAction.fetchEdit({
         ...fieldsValue,
         content: this.state.editValue,
       });
     }
    });
  }
  handleEditChange(value) {
    this.setState({ editValue: value});
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
    const fileList = this.state.fileList;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    let category = [];
    if (this.props.categoryList.completed) {
      category = this.props.categoryList.result.data;
    }
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
              <Select placeholder="请选择一个分类">
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
            {getFieldDecorator('type')(
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
      articleDetail: state.article.detail,
      categoryList: state.category.list
    };
  },
  (dispatch) => {
    return {
      articlelAction: bindActionCreators(articlelAction, dispatch),
      categoryAction: bindActionCreators(categoryAction, dispatch)
    };
  }
)(CategoryAddForm)
