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
        minTime: results.starttime,
        maxTime: results.endtime,
        hiddenDays: [0, 1, 2, 3, 4, 5, 6].filter(
          (day) => !results.daysofweek.includes(day)
        ),
      });
    })
    .catch((error) => {
      message.error(error);
    });
};

export const fetchRoomName = () => {};
