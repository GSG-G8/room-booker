import moment from 'moment';

export const findRoomIdByName = (name, component) => {
  const { rooms } = component.props;
  const roomObj = rooms.find((room) => room.name === name);
  if (roomObj) {
    return roomObj.id;
  }
  throw new Error(`no room by ${name} name`);
};

export const findRoomNameById = (id, component) => {
  const { rooms } = component.props;
  return rooms.find((room) => room.id === Number(id)).name;
};

export const cancelBooking = (id, date, message, component) => {
  const { fetchEvents } = component.props;
  component.setState({ confirmLoading: true });
  return fetch(`api/v1//booking/${id}`, { method: 'delete' })
    .then((res) => {
      if (!res.ok) {
        res.json().then(({ message: msg }) => message.error(msg));
        throw res.statusText;
      }
      return res.json();
    })
    .then(({ msg }) => {
      message.success(msg);
      fetchEvents(date.format('YYYY-MM-DD'));
      component.setState({ confirmLoading: false });
    })
    .catch((err) => {
      message.error(err);
    });
};

export const range = (min, max) => {
  const start = Number(min.split(':')[0]);
  const end = Number(max.split(':')[0]);
  const result = [];
  for (let i = 0; i < 24; i += 1) {
    if (i < start || i > end - 1) {
      result.push(i);
    }
  }
  return result;
};

export const makeBookingArr = (
  repeat,
  date,
  [startDate, endDate] = [],
  [startTime, endTime]
) => {
  const handleTime = (day, time) =>
    moment(
      `${day.format('YYYY-MM-DD')}T${time.format('HH:mm:ss.SSSZ')}`
    ).toISOString(true);

  const arr = [];
  if (repeat === 'weekly') {
    for (let i = startDate; i <= endDate; i = i.add(1, 'week')) {
      arr.push({
        startTime: handleTime(i, startTime),
        endTime: handleTime(i, endTime),
      });
    }
  } else if (repeat === 'daily') {
    for (let i = startDate; i <= endDate; i = i.add(1, 'day')) {
      if (i.format('dddd') !== 'Friday' && i.format('dddd') !== 'Saturday') {
        arr.push({
          startTime: handleTime(i, startTime),
          endTime: handleTime(i, endTime),
        });
      }
    }
  } else if (repeat === 'once') {
    arr.push({
      startTime: handleTime(date, startTime),
      endTime: handleTime(date, endTime),
    });
  }
  return arr;
};

export const bookRoom = (
  { repeat, date, daterange, time, remind: remindMe = true, room, ...rest },
  message,
  component
) => {
  const { handleHide, fetchEvents } = component.props;
  let roomId;
  try {
    roomId = findRoomIdByName(room, component);
  } catch (e) {
    component.setState({ confirmLoading: false });
    return Promise.reject(e.message);
  }
  const timeArr = makeBookingArr(repeat, date, daterange, time);
  component.setState({ confirmLoading: true });
  const body = { roomId, time: timeArr, remindMe, ...rest };
  return fetch('/api/v1/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) {
        res.json().then(({ message: msg }) => message.error(msg));
        throw res.statusText;
      }
      return res.json();
    })
    .then(() => fetchEvents(timeArr[0].startTime.split('T')[0]))
    .then(() => {
      component.setState({ confirmLoading: false });
      handleHide();
    })
    .then(() => message.success('Room booked successfully', 3))
    .catch(() => {
      component.setState({ confirmLoading: false });
    });
};
