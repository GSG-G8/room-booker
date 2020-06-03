export const getBusinessHours = (component, message) => {
  fetch(`/api/v1/businessHours`)
    .then((res) => {
      if (!res.ok) {
        message.error('could not fetch business hours');
        throw res.statusText;
      }
      return res.json();
    })
    .then((results) => {
      component.setState({
        businessHours: {
          daysOfWeek: results.daysofweek,
          startTime: results.starttime,
          endTime: results.endtime,
        },
      });
    })
    .catch((error) => {
      message.error(error);
    });
};

export const fetchRoomName = () => {};
