import '../App.css';
import React, { useEffect, useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Button, Icon, notification,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
// TODO calculate bottom
const floatingStyle = () => (
  {
    position: 'absolute',
    bottom: 25,
    right: 30,
    zIndex: 10000,
  });


const Notifications = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  window.onPhoneCallClose = ({ clientId }) => {
    notification.close(clientId)
  };
  window.onPhoneCall = ({ clientId, phone }) => {
    dispatch(actions.addNotification({
      key: clientId,
      message: (
        <h4 style={{ marginTop: 4, marginRight: 10 }}>
          Входищий звонок
          {' '}
          {phone}
        </h4>
      ),
      btn: (
        <Button
          style={{ marginTop: 8, float: 'right' }}
          onClick={() => {
            dispatch(actions.toggleNotification(clientId))
            history.push(`/clients/${clientId}`);
          }}
        >
          Узнать больше
        </Button>),
      icon: 'phone',
      isShown: true,
      hidenIcon: 'phone',
    }))
  };

  const notifications = useSelector((state) => state.notifications);
  const [notificationIcons, setNotificationIcons] = useState([])
  useEffect(() => {
    if (notifications) {
      setNotificationIcons(Object.keys(notifications).filter(
        (key) => !notifications[key].isShown,
      ).map((key) => (
        <Button
          key={key}
          size="large"
          style={floatingStyle()}
          onClick={() => dispatch(actions.toggleNotification(key))}
          shape="circle"
          icon={notifications[key].hidenIcon || 'notification'}
        />
      )));

      Object.keys(notifications)
        .forEach((key) => {
          if (notifications[key].isShown) {
            notification.open({
              placement: 'bottomRight',
              key,
              style: { width: 'max-content' },
              bottom: 0,
              duration: null,
              icon: <Icon type={notifications[key].icon} style={{ color: '#108ee9' }} />,
              message: notifications[key].message,
              btn: notifications[key].btn,
              description: notifications[key].description,
            })
          } else {
            notification.close(key)
          }
        })
    }
  }, [notifications]);
  return notificationIcons;
};

export default Notifications;
