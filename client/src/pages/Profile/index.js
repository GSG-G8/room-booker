/* eslint-disable react/no-unused-state */
import React from 'react';
import { LockOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Spin } from 'antd';
import Navbar from '../../components/Navbar';

import './style.css';

class Profile extends React.Component {
  state = {
    loading: true,
    profileData: {},
    isUpdate: false,
  };

  formRef = React.createRef();

  componentDidMount() {
    this.fetchProfileData().then(() => this.setState({ loading: false }));
  }

  // nameOnChange = (e) => {
  //   this.setState({ profileData: { name: e.target.value } });
  // };

  toggleUpdate = () => {
    const { isUpdate } = this.state;
    this.setState({ isUpdate: !isUpdate });
  };

  fetchProfileData = () =>
    fetch(`/api/v1/profile`)
      .then((res) => {
        if (!res.ok) {
          res.json().then(notification.error);
          throw res.statusText;
        }
        return res.json();
      })
      .then((results) => {
        this.formRef.current.setFieldsValue(results);
        this.setState({ profileData: results });
      })
      .catch((err) => {
        notification.error(err);
      });

  updateProfile = (values) => {
    const { isUpdate } = this.state;
    const { name, oldPassword, password } = values;
    // console.log(values);

    fetch(`/api/v1//patchProfile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, oldPassword, password }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(notification.error);
        } else {
          notification.success({
            message: 'data has been updated',
          });
          this.setState({ isUpdate: !isUpdate });
          this.formRef.current.setFieldsValue({
            oldPassword: '',
            password: '',
          });
        }
      })
      .catch((err) => {
        notification.error(err);
      });
  };

  render() {
    const { loading, isUpdate } = this.state;

    return (
      <div>
        <Navbar />

        <div className="profile">
          <h2 className="profile__header">
            <span className="profile__header__apan">Profile </span> Page
          </h2>
          {loading && <Spin />}
          <div className="profile__header__container">
            <img
              className="avatar"
              src="https://bootdey.com/img/Content/avatar/avatar6.png"
              alt="avatar"
            />
            <Form
              className="profile__form"
              labelCol={{
                span: 7,
              }}
              labelAlign="left"
              ref={this.formRef}
              // initialValues={{
              //   name,
              //   email,
              //   // password: '',
              //   // oldPassword: '',
              // }}
              onFinish={(values) => this.updateProfile(values)}
            >
              {/* <Form.Item
              name="image"
              className="avatar"
              // style={{
              //   marginBottom: '0px',
              //   width: 130,
              //   height: '130',
              //   borderradius: '63',
              //   borderwidth: 4,
              //   bordercolor: 'white',
              // }}
            > */}

              <Form.Item name="name" label="Name" className="profile__input">
                <Input
                  disabled={!isUpdate}
                  // placeholder={name}
                  prefix={<EditOutlined />}
                  onChange={this.nameOnChange}
                />
              </Form.Item>
              <Form.Item name="email" label="Email" className="profile__input">
                <Input disabled prefix={<MailOutlined />} />
              </Form.Item>
              {isUpdate && (
                <Form.Item
                  name="oldPassword"
                  label="oldPassword"
                  className="profile__input"
                >
                  <Input type="password" prefix={<LockOutlined />} />
                </Form.Item>
              )}
              {isUpdate && (
                <Form.Item
                  name="password"
                  label="Password"
                  className="profile__input"
                >
                  <Input
                    disabled={!isUpdate}
                    type="password"
                    prefix={<LockOutlined />}
                  />
                </Form.Item>
              )}
              <div className="profile__button">
                {isUpdate || (
                  <Button
                    onClick={this.toggleUpdate}
                    type="primary"
                    // htmlType="submit"
                    className="profile__button--update"
                  >
                    update profile
                  </Button>
                )}
                {isUpdate && (
                  <Button
                    // disabled={!isUpdate}
                    type="primary"
                    // htmlType="submit"
                    className="profile__button--save"
                    onClick={() => {
                      this.setState({ isUpdate: false });
                    }}
                  >
                    cancel
                  </Button>
                )}
                {isUpdate && (
                  <Button
                    // disabled={!isUpdate}
                    type="primary"
                    htmlType="submit"
                    className="profile__button--save"
                  >
                    save
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
