import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as articlelAction from '../../actions/article';

import { Table, Icon, Switch} from 'antd';
import moment from 'moment';
const TYPE = {
  1: '私有',
  2: '转载'
}
class ArticleList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.requestData();
  }
  handlePageChange(current) {
    this.requestData({current})
  }
  requestData(params) {
    let newParams = {
      current: 1,
      pageSize: 10,
      ...params
    }
    this.props.articlelAction.fetchList(newParams);
  }
  configColumns() {
    return [
      { title: '标题', className:'common-td', dataIndex: 'title', key: 'title' },
      { title: '作者', className:'common-td', dataIndex: 'author', key: 'author' },
      { title: '类型', className:'common-td', dataIndex: 'type', key: 'type', render(type) {
        return TYPE[type]
      }},
      { title: '分类', className:'common-td', dataIndex: 'category', key: 'category',
        render(category) {
          return category && category.name
        }
      },
      { title: '浏览次数', className:'common-td', dataIndex: 'visits', key: 'visits' },
      { title: '点赞统计', className:'common-td', dataIndex: 'stars', key: 'stars' },

      { title: '创建时间', className:'common-td', dataIndex: 'createdAt', key: 'createdAt',
        render(createdAt) { return createdAt && moment(createdAt).format('YYYY-MM-DD hh:mm')}
      },
      { title: '更新时间', className:'common-td', dataIndex: 'updatedAt', key: 'updatedAt',
        render(updatedAt) { return updatedAt && moment(updatedAt).format('YYYY-MM-DD hh:mm')}
      },
      { title: '状态', className:'common-td', dataIndex: 'disabled', key: 'disabled', render(disabled) {
        return (
          <Switch
            checked={disabled==='0'? false : true}
            checkedChildren={'开'}
            unCheckedChildren={'关'} />
        )
      }},
      { title: '功能', className:'common-td',  key: 'action',
        render(record) {
          return (
            <div>
              <Link to={`/manage/article/edit?type=mod&id=${record.id}`} className="common-action ">编辑</Link>
              <Link className="common-action ">删除</Link>
            </div>
          )
        }
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
        <Table
          dataSource={article.data}
          columns={this.configColumns()}
          pagination={{
            total: article.total,
            pageSize: article.pageSize,
            onChange: this.handlePageChange.bind(this),
            showTotal: total => `共 ${total} 篇`
          }}
          bordered/>
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
