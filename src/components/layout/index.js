import './layout.scss';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryAction from '../../actions/category';

import { Menu, Icon,  Breadcrumb, Badge,  Dropdown} from 'antd';
const _height = document.body.clientHeight;
import Base64 from 'js-base64';
import { clearCookie } from '../../tool/cookie';
class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys:[]
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.requestCategory();
  }
  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    this.state.selectedKeys = [location.pathname];
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
  handleUserDrop(info) {
    if (info.key === 'logout') {
      clearCookie('usertoken');
      this.context.router.push('/login');
    }
  }
  requestCategory() {
    this.props.categoryAction.fetchList({isPage: 1});
  }
  render() {
    const menu = (
      <Menu onClick={this.handleUserDrop.bind(this)}>
        <Menu.Item key="logout">
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="layout">
        <header className="layout-header">
            <div className="layout-header-icon"><Icon type="dingding" /></div>
            <div className="layout-header-label">
              博客后台管理系统
            </div>
            <div className="layout-header-user">
                <span className="layout-list-item"><Icon type="mail" /></span>
                <span className="layout-list-item"><Icon type="notification"/></span>
                <span className="layout-list-item">
                  <Dropdown overlay={menu} trigger={['click']}>
                     <Icon type="logout" />
                  </Dropdown>
                </span>
            </div>
        </header>
        <section className="layout-menu">
            <div className="menu-header">
              <div className="avater">
                <img src="http://7xr8fr.com1.z0.glb.clouddn.com/IMG_2197.JPG"/>
              </div>
              <div className="info">王敬博</div>
            </div>
            <Menu
              className="menu-theme"
              style={{ width: 240 }}
              mode="inline"
              selectedKeys={this.state.selectedKeys}
              onClick={this.handleClick}
            >
              <Menu.SubMenu
                title={<span><Icon type="mail" />资源管理</span>}>
                <Menu.Item key="manage/resource/carousel">轮播管理</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="manage/reptile">
                <Icon type="mail" />
                爬虫管理
              </Menu.Item>
              <Menu.SubMenu
                title={<span><Icon type="mail" />文章管理</span>}>
                <Menu.Item key="manage/article/list">文章列表</Menu.Item>
                <Menu.Item key="manage/article/edit?type=new">编辑文章</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="manage/category">
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
