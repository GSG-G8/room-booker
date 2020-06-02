import React from 'react';
import { LockOutlined, MailOutlined, EditOutlined } from '@ant-design/icons';
// eslint-disable-next-line no-unused-vars
import { Button, Form, Input, notification, Spin } from 'antd';
import Navbar from '../../components/Navbar';

import './style.css';

class Profile extends React.Component {
  state = {
    // loading: true,
    profileData: {},
  };

  componentDidMount() {
    this.fetchProfileData();
  }

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

  render() {
    const { profileData } = this.state;
    const { name, email } = profileData;
    // eslint-disable-next-line no-console
    console.log(profileData);
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
              span: 6,
            }}
            labelAlign="left"
          >
            <Form.Item name="name" label="Name" className="profile__input">
              <Input disabled placeholder={name} prefix={<EditOutlined />} />
            </Form.Item>
            <Form.Item name="email" label="Email" className="profile__input">
              <Input disabled placeholder={email} prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              className="profile__input"
            >
              <Input
                disabled
                placeholder="*********"
                type="password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <div className="profile__button">
              <Button
                type="primary"
                htmlType="submit"
                className="profile__button--update"
              >
                update profile
              </Button>
              <Button
                disabled
                type="primary"
                htmlType="submit"
                className="profile__button--save"
              >
                save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
export default Profile;
