/* eslint-disable import/prefer-default-export */
export const fetchData = (component, message) => {
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
      component.setState({ loading: false, data: resultsWithKey });
    })
    .catch(() => {
      component.setState({ loading: false });
    });
};
