export const getBusinessHours = (updateBusinessHours, message) => {
  fetch(`/api/v1/businessHours`)
    .then((res) => {
      if (!res.ok) {
        message.error('could not fetch business hours');
        throw res.statusText;
      }
      return res.json();
    })
    .then((results) => {
      updateBusinessHours({
        daysOfWeek: results.daysofweek,
        startTime: results.starttime,
        endTime: results.endtime,
      });
    })
    .catch((error) => {
      message.error(error);
    });
};

export const patchBusinessHours = (values, message, notification) => {
  fetch(`/api/v1/businessHours`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  }).then((res) => {
    if (!res.ok) {
      message.error('could not update business hours');
    } else {
      notification.success({
        message: 'business hours has been updated',
      });
    }
  });
};
