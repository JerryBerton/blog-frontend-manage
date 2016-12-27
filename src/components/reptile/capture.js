import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Base64 from 'js-base64';
import * as reptileAction from '../../actions/reptile';
import { Spin, Icon} from 'antd';
import './index.scss';
import DumpArticle from './dump_article';
class ReptileCapture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handleClickShow = this.handleClickShow.bind(this);
  }
  componentWillMount() {
    const { location, params} = this.props;
    let href = Base64.Base64.decode(location.query.href);
    let id = params.id;
    this.props.reptileAction.fetchCapture({ id, href });
  }
  handleClickShow() {
    let visible = !this.state.visible;
    this.setState({ visible });
  }
  render() {
    let reptileCaptrue = this.props.reptileCaptrue;
    let visible = this.state.visible;
    return (
      <Spin tip="捕获中..." spinning={!reptileCaptrue.completed}>
        <div className="capture-box">
          <div className="common-fixd capture-edit">
            <span onClick={this.handleClickShow}>编辑</span>
          </div>
          {
            visible ? (<DumpArticle data={reptileCaptrue.result}/>) : (
              <div>
                <div className="capture-box-title">
                  <p>{reptileCaptrue.result && reptileCaptrue.result.title}</p>
                  <p className="capture-box-origin">
                  来源URL:
                  { reptileCaptrue.result && reptileCaptrue.result.url}
                  </p>
                </div>
                <div
                  className="capture-markdown"
                  dangerouslySetInnerHTML={
                    { __html: reptileCaptrue.result
                      && reptileCaptrue.result.content
                    }
                }>
                </div>
              </div>
            )
          }
        </div>
      </Spin>
    )
  }
}
export default connect(
  (state) => {
    return {
      reptileCaptrue: state.reptile.capture
    };
  },
  (dispatch) => {
    return {
      reptileAction: bindActionCreators(reptileAction, dispatch)
    };
  }
)(ReptileCapture)
