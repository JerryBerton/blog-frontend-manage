import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryAction from '../../actions/category';

import './category.scss';

import { Row, Col, Card, Icon, Tag, Input, Popconfirm, Button, message, Modal} from 'antd';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: null,
      tagParentId: null,
      categoryName: null,
      visible: false
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }
  componentWillMount() {
    this.props.categoryAction.fetchList({isPage: 1});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryEdit.completed &&
      JSON.stringify(this.props.categoryEdit) !== JSON.stringify(nextProps.categoryEdit)) {
        message.success("分类添加成功");
        this.state.visible = false;
        this.state.categoryId = null;
        this.props.categoryAction.fetchList();
    }
    if (nextProps.categoryRemove.completed &&
      JSON.stringify(this.props.categoryRemove) !== JSON.stringify(nextProps.categoryRemove)) {
        message.success("分类删除成功");
        this.props.categoryAction.fetchList();
    }
  }
  handleOpenEditClick(record) {
    this.setState({
      categoryId: record.id,
      categoryName: record.name
    });
  }
  handleClickAdd() {
    Modal.confirm({
      title: '添加分类',
      content: (<Input onChange={this.handleChangeInput} placeholder="输入分类名称" />),
      okText: '保存',
      cancelText: '取消',
      onOk: () => {
        if (this.state.categoryName) {
          this.props.categoryAction.fetchEdit({
            name: this.state.categoryName
          });
        }
      }
    });
  }
  handleDeleteCategory(id) {
    Modal.confirm({
      title: '温馨提醒',
      content: '你确定要删除该分类吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.props.categoryAction.fetchRemove(id);
      }
    });
  }
  handleChangeInput(e) {
    this.setState({
      categoryName: e.target.value
    });
  }
  handleSaveEditClick() {
    const { categoryName, categoryId} = this.state;
    this.props.categoryAction.fetchEdit({ name: categoryName }, categoryId);
  }
  handleDeleteTag(id) {
    this.props.tagAction.fetchRemove(id);
  }
  showTagsAddInput(categoryId) {
    this.setState({ tagParentId: categoryId }, () => {
      this.refs[`input_${categoryId}`].focus()
    });
  }
  handleSubmitTag(e) {
    let value = e.target.value;
    const that = this;
    if (value === '') {
      message.warn("必须输入标签名字");
      return;
    }
    Modal.confirm({
        title: '温馨提醒',
        content: '你确定要在该分类下添加标签吗?',
        onOk: ()=> {
          const data = {
            categoryId: that.state.tagParentId,
            name: value
          };
          that.props.tagAction.fetchAdd(data);
          this.state.tagParentId = null;
        },
        onCancel() {
          that.setState({tagParentId: null})
        },
    });
  }
  renderTags(list) {
    return list.map(n => (
      <div key={n.id} className="category-item">
        <span>{ n.name }</span>
        <span onClick={ () => { this.handleDeleteCategory(n.id) }}>
          <Icon type="delete" />
        </span>
      </div>
    ));
  }
  render() {
    let category = [];
    if (this.props.categoryList.completed) {
      category = this.props.categoryList.result;
    }
    return (
      <div className="common-pannel category-pannel">
        <div className="common-operate" title="分类管理">
        </div>
        <div className="category-box">
          { this.renderTags(category) }
          <div className="category-item">
            <span><Icon type="plus-circle" /></span>
            <span onClick={this.handleClickAdd}>添加</span>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => {
    return {
      categoryList: state.category.list,
      categoryEdit: state.category.edit,
      categoryRemove: state.category.remove,
    };
  },
  (dispatch) => {
    return {
      categoryAction: bindActionCreators(categoryAction, dispatch),
    };
  }
)(CategoryList)
