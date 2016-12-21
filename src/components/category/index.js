import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryAction from '../../actions/category';

import './category.scss';
import { Row, Col, Card, Icon, Tag, Tooltip, Input} from 'antd';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: null
    };
  }
  handleTitleEditClick(id) {
    this.setState({categoryId: id});
  }
  renderElement(record) {
    let visable = this.state.categoryId === record.id;
    return (
      <div className="card-item-header">
        <span
          className="card-item-header-left"
          style={{display: visable ? 'none' : 'block'}}>
          {record.name}
          <Icon type="edit" onClick={() => { this.handleTitleEditClick(record.id)}}/>
         </span>
        <span
          className="card-item-header-left"
          style={{display: visable ? 'block' : 'none'}}>
          <Input placeholder="Basic usage"/>
        </span>
        <span className="card-item-header-right"><Icon type="close-square" /></span>
      </div>
    )
  }
  render() {
    let category = [];
    if (this.props.categoryList.completed) {
      category = this.props.categoryList.result.data;
    }
    console.log('b', category)
    return (
      <div className="common-pannel category-pannel">
        <Row>
          {
            category.map((item) => (
              <Col span="8" key={item.id}>
                <Card title={this.renderElement(item)}>
                  <Tag>Tag 1</Tag>
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
      categoryList: state.category.list
    };
  },
  (dispatch) => {
    return {
      categoryAction: bindActionCreators(categoryAction, dispatch)
    };
  }
)(CategoryList)
