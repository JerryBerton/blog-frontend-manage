import React from 'react';
import './carousel.scss';
import { Card, Button, Icon} from 'antd';
class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="layout-carousel">
        <div className="carousel-add-open">
          <Icon type="plus-square-o" />
        </div>
        <div className="carousel-add" rc-animate={{transitionName: 'zoom'}}>测试</div>
        <div className="carousel-list">
          <Card  className="carousel-item" style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
              <img alt="example" width="100%" src="http://ofdlfhayt.bkt.clouddn.com/IMG_1961.JPG" />
            </div>
            <div className="carousel-card">
              <h3>Europe Street beat</h3>
            </div>
            <div className="carousel-opt">
               <Button shape="circle" icon="delete" />
            </div>
          </Card>
          <Card  className="carousel-item" style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
              <img alt="example" width="100%" src="http://ofdlfhayt.bkt.clouddn.com/IMG_1961.JPG" />
            </div>
            <div className="carousel-card">
              <h3>Europe Street beat</h3>
            </div>
            <div className="carousel-opt">
               <Button shape="circle" icon="delete" />
            </div>
          </Card>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}

export default Carousel;
