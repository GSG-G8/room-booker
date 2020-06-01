export const fetchData = (component, message) => {
  component.setState({ loading: true });

  fetch(`/api/v1/rooms`)
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

export const createRoom = (values, component, message, notification) => {
  fetch(`/api/v1/rooms`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((res) => {
    if (!res.ok) {
      message.error('could not create room');
    } else {
      fetchData(component, message);
      component.setState({ visible: false });
      notification.success({
        message: 'room has been created',
      });
    }
  });
};

export const deleteRoom = (id, component, message, notification) => {
  fetch(`/api/v1/rooms/${id}`, {
    method: 'delete',
  }).then((res) => {
    if (!res.ok) {
      message.error('could not delete the room');
    } else {
      notification.success({
        message: 'room has been deleted',
      });
      const { data } = component.state;
      component.setState({ data: data.filter((row) => row.id !== id) });
    }
  });
};

export const updateRoom = (values, component, message, notification) => {
  const { id, name } = values;

  fetch(`/api/v1/rooms/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  }).then((res) => {
    if (!res.ok) {
      message.error('could not update the room');
    } else {
      notification.success({
        message: 'room has been updated',
      });
      fetchData(component, message);
      component.setState({
        visible: false,
      });
    }
  });
};
