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

export const getBookingTypes = (component, message) => {
  component.setState({ loading: true });
  fetch('/api/v1/bookingTypes')
    .then((res) => {
      if (!res.ok) {
        message.error('could not fetch data');
        throw res.statusText;
      }
      return res.json();
    })
    .then((results) => {
      const resultsWithKey = results.map((row) => ({ key: row.id, ...row }));
      component.setState({ loading: false, types: resultsWithKey });
    })
    .catch(() => {
      component.setState({ loading: false });
    });
};

export const fetchRoomName = (component, message) =>
  fetch(`/api/v1/rooms`)
    .then((res) => {
      if (!res.ok) {
        res.json().then(({ message: msg }) => message.error(msg));
        throw res.statusText;
      }
      return res.json();
    })
    .then((results) => {
      component.setState({ rooms: results });
    })
    .catch((err) => {
      message.error(err);
    });
