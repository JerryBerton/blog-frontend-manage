import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as articlelAction from '../../actions/article';

import { Table } from 'antd';
import moment from 'moment';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.requestData();
  }
  componentDidMount() {

  }
  requestData() {
    this.props.articlelAction.fetchList();
  }
  configColumns() {
    return [
      { title: '标题', dataIndex: 'title', key: 'title' },
      { title: '分类', dataIndex: 'category', key: 'category',
        render(category) {
          return category && category.name
        }
      },
      { title: '浏览次数', dataIndex: 'hits', key: 'hits' },
      { title: '点赞统计', dataIndex: 'stars', key: 'stars' },
      { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt',
        render(createdAt) { return createdAt && moment(createdAt).format('YYYY-MM-DD hh:mm')}
      },
      { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt',
        render(updatedAt) { return updatedAt && moment(updatedAt).format('YYYY-MM-DD hh:mm')}
      }
    ];
  }
  render() {
    let article = {};
    if (this.props.articleList.completed) {
      article = this.props.articleList.result
    }
    return (
      <div className="common-pannel">
        <Table dataSource={article.data} columns={this.configColumns()} />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      articleEdit: state.article.edit,
      articleRemove: state.article.remove,
      articleList: state.article.list
    };
  },
  (dispatch) => {
    return {
      articlelAction: bindActionCreators(articlelAction, dispatch)
    };
  }
)(ArticleList)
