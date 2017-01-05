import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Base64 from 'js-base64';
import * as reptileAction from '../../actions/reptile';
import * as articleAction from '../../actions/article';
import * as categoryAction from '../../actions/category';

import { Spin, message, Button, Modal, Select } from 'antd';
import './index.scss';
import moment from 'moment';

class ReptileCapture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: null,
    };
    this.handleClickForward = this.handleClickForward.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentWillMount() {
    const { location, params} = this.props;
    let href = Base64.Base64.decode(location.query.href);
    let id = params.id;
    this.props.reptileAction.fetchCapture({ id, href });
    this.props.categoryAction.fetchList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.articleEdit.completed &&
      JSON.stringify(this.props.articleEdit) !== JSON.stringify(nextProps.articleEdit)) {
        message.success('转存成功, 2秒后页面跳转', 2);
        setTimeout(() => {
          this.context.router.push('/manage/article/list');
        }, 2000);
      }
  }
  handleSelectChange(value) {
    this.state.categoryId = value;
  }
  renderSelect() {
    let category = [];
    if (this.props.categoryList.completed) {
      category = this.props.categoryList.result;
    }
    const options =  category.map(item =>
      (<Select.Option key={item.id} value={item.id.toString()}>{item.name}</Select.Option>)
    );
    return (<Select onChange={this.handleSelectChange}style={{ width: 200 }}>{options}</Select>)
  }
  handleClickForward() {
    Modal.confirm({
      title: '为转为文章，添加一个分类',
      content: this.renderSelect(),
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        if (this.state.categoryId) {
          let reptileCaptrue = this.props.reptileCaptrue;
          let data = {
            ...reptileCaptrue.result,
            type: 2,
            categoryId: this.state.categoryId
          };
          this.props.articleAction.fetchEdit(data);
        }
      }
    });

  }
  handleClickBack() {
    this.context.router.goBack();
  }
  render() {
    let reptileCaptrue = this.props.reptileCaptrue;
    return (
      <Spin tip="捕获中..." spinning={!reptileCaptrue.completed}>
        <div className="capture-box">
          <div className="capture-box-title">
            <p className="capture-title">{reptileCaptrue.result && reptileCaptrue.result.title}</p>
            <p className="capture-desc">内容概要:
              <span>
                { reptileCaptrue.result && reptileCaptrue.result.description }
              </span>
            </p>
            <ul className="capture-box-origin">
              <li>
              作者:
              <span>{ reptileCaptrue.result && reptileCaptrue.result.author }</span></li>
              <li>
                源地址:
                <span>{ reptileCaptrue.result && reptileCaptrue.result.origin }</span>
              </li>
              <li>
                浏览数:
                <span>{ reptileCaptrue.result && reptileCaptrue.result.visits }</span>
              </li>
              <li>
                创建时间:
                <span>{ reptileCaptrue.result &&
                  moment(reptileCaptrue.result.time).format('YYYY-MM-DD') }</span>
              </li>
            </ul>
          </div>
          <div
            className="capture-markdown"
            dangerouslySetInnerHTML={
              { __html: reptileCaptrue.result
                && reptileCaptrue.result.content
              }
          }>
          </div>
          <div className="capture-opt">
            <Button type="primary" icon="rollback" onClick={this.handleClickBack}>返回</Button>
            <Button type="primary" icon="export" onClick={this.handleClickForward}>转存</Button>
          </div>
        </div>
      </Spin>
    )
  }
}
ReptileCapture.contextTypes = {
  router: React.PropTypes.object
}
export default connect(
  (state) => {
    return {
      articleEdit: state.article.edit,
      reptileCaptrue: state.reptile.capture,
      categoryList: state.category.list
    };
  },
  (dispatch) => {
    return {
      reptileAction: bindActionCreators(reptileAction, dispatch),
      articleAction: bindActionCreators(articleAction, dispatch),
      categoryAction: bindActionCreators(categoryAction, dispatch)
    };
  }
)(ReptileCapture)
