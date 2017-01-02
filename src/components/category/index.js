import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryAction from '../../actions/category';
import * as tagAction from '../../actions/tag';

import './category.scss';
import CategoryAdd from './add.js';

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
    this.handleCloseEditClick = this.handleCloseEditClick.bind(this);
    this.handleSaveEditClick = this.handleSaveEditClick.bind(this);
    this.handleCloseEditClick = this.handleCloseEditClick.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmitTag = this.handleSubmitTag.bind(this);
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
    if (nextProps.tagEdit.completed &&
      JSON.stringify(this.props.tagEdit) !== JSON.stringify(nextProps.tagEdit)) {
        message.success("标签添加成功");
        this.props.categoryAction.fetchList();
    }
    if (nextProps.tagRemove.completed &&
      JSON.stringify(this.props.tagRemove) !== JSON.stringify(nextProps.tagRemove)) {
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
  handleCloseEditClick() {
    this.setState({categoryId: null});
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
  handleCategorySubmit(data) {
    this.props.categoryAction.fetchEdit(data);
  }
  renderElement(record) {
    let visable = this.state.categoryId === record.id;
    return (
      <div className="card-item-header">
        <div
          className="card-item-header-left"
          style={{display: visable ? 'none' : 'block'}}>
          {record.name}
          <Icon type="edit" onClick={() => { this.handleOpenEditClick(record)}}/>
         </div>
        <div
          className="card-item-header-left"
          style={{display: visable ? 'block' : 'none'}}>
          <Input value={this.state.categoryName} onChange={this.handleChangeInput}/>
          <span
            onClick={this.handleSaveEditClick}>
            <Icon type="check-circle" />
          </span>
          <span onClick={this.handleCloseEditClick}><Icon type="close-circle" /></span>
        </div>
        <div className="card-item-header-right" onClick={() => { this.handleDeleteCategory(record.id)}}>
          <Icon type="close-square" />
        </div>
      </div>
    )
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
  renderTags(tags) {
    return tags.map(n => (
      <Popconfirm
        key={n.id}
        title="你确定要删除这个标签吗"
        onConfirm={() => { this.handleDeleteTag(n.id)}}
        okText="是" cancelText="否">
        <Tag>{ n.name}</Tag>
      </Popconfirm>
    ));
  }
  render() {
    let category = [];
    if (this.props.categoryList.completed) {
      category = this.props.categoryList.result.data;
    }
    const tagParentId = this.state.tagParentId;
    return (
      <div className="common-pannel category-pannel">
        <div className="common-operate">
          <Button onClick={() => {this.setState({ visible: true})}}>添加</Button>
          <CategoryAdd
            onCancel={() =>{ this.setState({ visible: false })}}
            onSubmit={this.handleCategorySubmit.bind(this)}
            visible={this.state.visible}/>
        </div>
        <Row>
          {
            category.map((item) => (
              <Col span="8" key={item.id}>
                <Card title={this.renderElement(item)}>
                  { this.renderTags(item.tags) }
                  {
                    tagParentId === item.id &&
                    (
                      <Input
                        ref={`input_${item.id}`}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        onBlur={this.handleSubmitTag}
                        onPressEnter={this.handleSubmitTag}
                      />
                    )
                  }
                  {
                    tagParentId !== item.id &&
                    (
                      <Button
                        size="small"
                        type="dashed"
                        onClick={() => { this.showTagsAddInput(item.id) }}>
                        + 添加
                        </Button>
                    )
                  }
                </Card>
              </Col>
            ))
          }
          </Row>
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
      tagEdit: state.tag.edit,
      tagRemove: state.tag.remove,
    };
  },
  (dispatch) => {
    return {
      categoryAction: bindActionCreators(categoryAction, dispatch),
      tagAction: bindActionCreators(tagAction, dispatch)
    };
  }
)(CategoryList)
