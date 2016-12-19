import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as carouselAction from '../../actions/carousel';
import './carousel.scss';
import { Card, Button, Icon, message} from 'antd';
import CarouseAdd from './add';
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  componentDidMount() {
    this.props.carouselAction.fetchList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.carouselEdit.completed &&
      JSON.stringify(this.props.carouselEdit) !== JSON.stringify(nextProps.carouselEdit)) {
        message.success("轮播添加成功");
        this.state.visible = false;
        this.props.carouselAction.fetchList();
      }
  }
  handleSubmit(data) {
    this.props.carouselAction.fetchEdit(data);
  }
  renderCarouselList(arr) {
    return arr.map(item => (
      <Card
        key={item.id}
        className="carousel-item"
        style={{ width: 240 }}
        bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
          <img
            alt={item.label}
            width="100%"
            src={item.url}/>
        </div>
        <div className="carousel-opt">
           <Button className="carousel-opt-btn" shape="circle" icon="delete" />
        </div>
      </Card>
    ));
  }
  render() {
    const { carouselList } = this.props;
    let carouselListData = [];
    if (carouselList.completed) {
      carouselListData = carouselList.result.data;
    }
    return(
      <div className="layout-carousel">
        <div className="carousel-add">
          <Button onClick={() => {this.setState({ visible: true})}}>添加</Button>
          <CarouseAdd
            onCancel={() =>{ this.setState({ visible: false })}}
            onSubmit={this.handleSubmit.bind(this)}
            visible={this.state.visible}
          />
        </div>
        <div className="carousel-list">
          { this.renderCarouselList(carouselListData) }
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}
export default connect(
  (state) => {
    return {
      carouselEdit: state.carousel.edit,
      carouselRemove: state.carousel.remove,
      carouselList: state.carousel.list
    };
  },
  (dispatch) => {
    return {
      carouselAction: bindActionCreators(carouselAction, dispatch)
    };
  }
)(Carousel)
