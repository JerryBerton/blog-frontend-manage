import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Base64 from 'js-base64';
import * as reptileAction from '../../actions/reptile';
import { Spin, Icon} from 'antd';
import './index.scss';
class ReptileCapture extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const { location, params} = this.props;
    let href = Base64.Base64.decode(location.query.href);
    let id = params.id;
    this.props.reptileAction.fetchCapture({ id, href });
  }
  render() {
    let reptileCaptrue = this.props.reptileCaptrue;
    return (
      <Spin tip="捕获中..." spinning={!reptileCaptrue.completed}>
      <div className="common-fixd">
        <Icon type="edit" />
      </div>
        <div className="capture-box">
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
