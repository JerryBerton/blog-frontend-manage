import React from 'react';
import { connect } from 'react-redux';
import './category.scss';
import { Row, Col, Card, Icon, Tag, Tooltip, Input} from 'antd';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

  }
  renderElement() {
    return (
      <div className="card-item-header">
        <Tooltip placement="topLeft" title="双击编辑">
            <span><Input placeholder="Basic usage" /></span>
        </Tooltip>
        <span><Icon type="close-square" /></span>
      </div>
    )
  }
  render() {
    return (
      <div className="common-pannel category-pannel">
      <Row>
        <Col span="8">
          <Card title={this.renderElement()}>
            <Tag>Tag 1</Tag>
          </Card>
        </Col>
        </Row>
      </div>
    );
  }
}

export default CategoryList;
