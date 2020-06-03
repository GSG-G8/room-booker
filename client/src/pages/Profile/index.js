import React from 'react';
import { LockOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
// eslint-disable-next-line no-unused-vars
import { Button, Form, Input, notification, Spin } from 'antd';
import Navbar from '../../components/Navbar';

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

  nameOnChange = (e) => {
    this.setState({ profileData: { name: e.target.value } });
  };

  toggleUpdate = () => {
    const { isUpdate } = this.state;
    this.setState({ isUpdate: !isUpdate });
  };

  fetchProfileData = () =>
    fetch(`/api/v1/profile`)
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ message: msg }) => notification.error(msg));
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
    // console.log(values);

    fetch(`/api/v1//patchProfile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, oldPassword, password }),
    }).then((res) => {
      if (!res.ok) {
        notification.error('could not update ');
      } else {
        notification.success({
          message: 'data has been updated',
        });
        this.setState({ isUpdate: !isUpdate });
      }
    });
  };

  render() {
    const { profileData, loading, isUpdate } = this.state;
    const { name, email } = profileData;
    // console.log(name, 2222);

    if (loading) return <Spin />;
    return (
      <div>
        <Navbar />

        <div className="profile">
          <h2 className="profile__header">
            <span className="profile__header__apan">Profile </span> Page
          </h2>
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
                placeholder={name}
                prefix={<EditOutlined />}
                onChange={this.nameOnChange}
              />
            </Form.Item>
            <Form.Item name="email" label="Email" className="profile__input">
              <Input disabled placeholder={email} prefix={<MailOutlined />} />
            </Form.Item>
            {isUpdate && (
              <Form.Item
                name="oldPassword"
                label="oldPassword"
                className="profile__input"
              >
                <Input
                  placeholder="*********"
                  type="password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
            )}
            <Form.Item
              name="password"
              label="Password"
              className="profile__input"
            >
              <Input
                disabled={!isUpdate}
                placeholder="*********"
                type="password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <div className="profile__button">
              <Button
                onClick={this.toggleUpdate}
                disabled={isUpdate}
                type="primary"
                // htmlType="submit"
                className="profile__button--update"
              >
                update profile
              </Button>
              {isUpdate && (
                <Button
                  disabled={!isUpdate}
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
    );
  }
}
export default Profile;
