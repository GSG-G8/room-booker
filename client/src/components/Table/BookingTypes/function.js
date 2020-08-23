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

export const deleteType = (id, component, message, notification) => {
  fetch(`/api/v1/bookingType/${id}`, {
    method: 'delete',
  }).then((res) => {
    if (!res.ok) {
      message.error('could not delete this type');
    } else {
      notification.success({
        message: 'type has been deleted',
      });
      const { data } = component.state;
      component.setState({ data: data.filter((row) => row.id !== id) });
    }
  });
};

// export const editType = (id, component, message)
