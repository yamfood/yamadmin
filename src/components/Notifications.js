import '../App.css';
import React, { useEffect, useState } from 'react';
import {
  Router, useHistory,
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
      )))

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
              closeIcon: (
                <Button
                  type="link"
                  icon="close"
                  onClick={(e) => e.stopPropagation() || dispatch(actions.toggleNotification(key))}
                />
              ),
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
  const history = useHistory();

  useEffect(() => {
    console.log('WTFF')
    dispatch(actions.addNotification({
      key: '123',
      message: (
        <h4 style={{ marginTop: 4, marginRight: 10 }}>
          Входищий звонок +998 (90) 955-58-20
        </h4>
      ),
      btn: (
        <Button
          style={{ marginTop: 8, float: 'right' }}
          onClick={() => {
            dispatch(actions.toggleNotification('123'))
            history.push('/clients/3');
          }}
        >
          Узнать больше
        </Button>),
      icon: 'phone',
      isShown: false,
      hidenIcon: 'phone',
    }))
  }, [dispatch]);
  return notificationIcons;
};

export default Notifications;
