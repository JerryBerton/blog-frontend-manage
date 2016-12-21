import './layout.scss';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryAction from '../../actions/category';

import { Menu, Icon,  Breadcrumb, Badge} from 'antd';
const _height = document.body.clientHeight;
import Base64 from 'js-base64';
class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.requestCategory();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryList.completed &&
      JSON.stringify(nextProps.categoryList)!== JSON.stringify(this.props.categoryList)) {
        let categoryList = nextProps.categoryList.result.data;
        localStorage.setItem("category",
        Base64.Base64.encode(JSON.stringify(categoryList)));
      }
  }
  handleClick(info) {
    this.context.router.push(`/${info.key}`);
  }
  requestCategory() {
    this.props.categoryAction.fetchList({isPage: 1});
  }
  render() {
    return (
      <div className="layout">
        <section className="layout-left">
          <header>
            <img
              style={{ width: "100%" }}
              src="http://7xr8fr.com1.z0.glb.clouddn.com/logo.png"/>
          </header>
            <Menu
              theme="dark"
              style={{ width: 240 }}
              mode="inline"
              onClick={this.handleClick}
            >
              <Menu.SubMenu
                title={<span><Icon type="mail" />资源管理</span>}>
                <Menu.Item key="resource/carousel">轮播管理</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                title={<span><Icon type="mail" />文章管理</span>}>
                <Menu.Item key="article/list">文章列表</Menu.Item>
                <Menu.Item key="article/add">编辑文章</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="category">
                <Icon type="mail" />
                分类管理
              </Menu.Item>
              <Menu.Item key="system">
                <Icon type="mail" />
                系统设置
              </Menu.Item>
            </Menu>
        </section>
        <section className="layout-right" style={{minHeight: _height}}>
          <div className="layout-header">
              <div className="layout-header-label"></div>
              <div className="layout-header-user">
                <ul>
                  <li>
                    <a className="layout-list-item">
                    <Icon type="bars" />
                    </a>
                  </li>
                  <li><a className="layout-list-item"><Icon type="mail" /></a></li>
                  <li><a className="layout-list-item"><Icon type="notification"/></a></li>
                </ul>
              </div>
          </div>
          <div className="layout-body">
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
}

LayoutComponent.contextTypes = {
  router: React.PropTypes.object
};

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
)(LayoutComponent)
