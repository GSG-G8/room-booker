import React from 'react';
// eslint-disable-next-line no-unused-vars
import { notification, Spin } from 'antd';
import './style.css';

class Profile extends React.Component {
  state = {
    // loading: true,
    // error: false,
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
    // eslint-disable-next-line no-console
    console.log(profileData);
    return <div className="Profile" />;
  }
}
export default Profile;
