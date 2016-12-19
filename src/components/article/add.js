import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as carouselAction from '../../actions/carousel';

import { Button, Form, message, Input, Upload, Icon, Modal} from 'antd';
class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    }
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.carouselEdit.completed &&
    //   JSON.stringify(this.props.carouselEdit) !== JSON.stringify(nextProps.carouselEdit)) {
    //     message.success("轮播添加成功");
    //     this.state.visible = false;
    //     this.props.carouselAction.fetchList();
    //   }
  }
  handleSubmit(data) {

  }
  handleUploadChange({ file, fileList }) {
    const list = fileList.map((item, index) => {
      return {...item, name: item.response}
    })
    this.setState({
      fileList: list
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList } = this.state;
    console.log(fileList);
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">选择图片</div>
      </div>
    );
    return(
      <div className="common-pannel">
        <Form horizontal>
          <Form.Item
            {...formItemLayout}
            label="标题"
            hasFeedback
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '文章标题必须传',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="上传图片"
            hasFeedback
          >
          <Upload
             action="http://127.0.0.1:3000/upload"
             listType="picture"
             fileList={fileList}
             onChange={this.handleUploadChange.bind(this)}
           >
           <Button type="ghost">
            <Icon type="upload" /> upload
            </Button>
           </Upload>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
let CategoryAddForm = Form.create()(CategoryAdd);
export default connect(
  (state) => {
    return {
      carouselEdit: state.carousel.edit,
    };
  },
  (dispatch) => {
    return {
      carouselAction: bindActionCreators(carouselAction, dispatch)
    };
  }
)(CategoryAddForm)
