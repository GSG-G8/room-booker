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
export const addType = (values, component, message, notification) => {
  const { category, color } = values;
  fetch(`/api/v1/bookingTypes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category, color }),
  })
    .then((res) => {
      if (!res.ok) {
        message.error('could not add this type');
      } else {
        notification.success({
          message: 'type has been added successfully',
        });
        fetchData(component, message);
        component.setState({
          visible: false,
        });
      }
    })
    .catch(() => message.error('could not add the type'));
};

export const editType = (values, component, message, notification) => {
  const { id, category, color } = values;
  fetch(`/api/v1/bookingType/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category, color }),
  })
    .then((res) => {
      if (!res.ok) {
        message.error('could not update the type');
      } else {
        notification.success({
          message: 'type has been updated',
        });
        fetchData(component, message);
        component.setState({
          visible: false,
        });
      }
    })
    .catch(() => message.error('could not update the type'));
};
