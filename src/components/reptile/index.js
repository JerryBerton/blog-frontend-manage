import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Base64 from 'js-base64';

import * as reptileAction from '../../actions/reptile';
import { Table } from 'antd';

const columns = [{
  title: '标题',
  dataIndex: 'title',
}, {
  title: '描述信息',
  dataIndex: 'description'
}, {
  title: '浏览量',
  dataIndex: 'visits',
}, {
  title: '来源信息',
  dataIndex: 'type',
}, {
  title: '操作',
  key: 'Action',
  render(text, record, index) {
    return (
      <Link
        to={{
          pathname: `/manage/reptile/capture/${record.id}`,
          query: { href: Base64.Base64.encode(record.href)}
        }}>
        捕获详情
      </Link>
    )
  }
}];
class Reptile extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.reptileAction.fetchList();
  }
  render() {
    let list = [];
    if (this.props.reptileList.completed) {
      list = this.props.reptileList.result;
    }
    return (
      <div className="common-pannel">
        <Table
          columns={columns}
          dataSource={list}
          pagination={false}/>
      </div>
    )
  }
}
export default connect(
  (state) => {
    return {
      reptileList: state.reptile.list
    };
  },
  (dispatch) => {
    return {
      reptileAction: bindActionCreators(reptileAction, dispatch)
    };
  }
)(Reptile)
