import React from 'react';
import { LockOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Spin } from 'antd';
import './style.css';

class Profile extends React.Component {
  state = {
    loading: true,
    profileData: {},
    isUpdate: false,
  };

  componentDidMount() {
    this.fetchProfileData().then(() => this.setState({ loading: false }));
  }

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
        this.setState({ profileData: results });
      })
      .catch((err) => {
        notification.error(err);
      });

  updateProfile = (values) => {
    const { isUpdate } = this.state;
    const { name, oldPassword, password } = values;

    fetch(`/api/v1/profile`, {
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
        }
      })
      .catch((err) => {
        notification.error(err);
      });
  };

  render() {
    const { loading } = this.state;

    if (loading) return <Spin />;

    const { isUpdate, profileData } = this.state;
    const { name, email } = profileData;

    return (
      <div>
        <div className="profile">
          <h2 className="profile__header">
            <span className="profile__header__apan">Profile </span> Page
          </h2>
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
              initialValues={{
                name,
                email,
              }}
              onFinish={(values) => this.updateProfile(values)}
            >
              <Form.Item name="name" label="Name" className="profile__input">
                <Input
                  disabled={!isUpdate}
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
                    className="profile__button--update"
                  >
                    update profile
                  </Button>
                )}
                {isUpdate && (
                  <Button
                    type="primary"
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
