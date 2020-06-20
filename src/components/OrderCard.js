import React, { useState, useEffect } from 'react';
import {
  Card,
  Icon,
  Popover,
  Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

import CancelOrderButton from './CancelOrderButton';

const { Meta } = Card;

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const activeOrders = useSelector((state) => state.activeOrders);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(actions.setMenuActive(8));
  }, []);

  const handleAccept = async () => {
    await dispatch(actions.acceptOrder(order.id, '/orders/active/'));
    setVisible(false);
  }
  const handleCancel = async (values) => {
    await dispatch(actions.cancelOrder(order.id, values, '/orders/active/'));
  };


  const displayContent = () => {
    switch (activeOrders.activeTabKey) {
      case 2:
        return (
          <CancelOrderButton
            btnType="danger"
            loading={activeOrders.cancelStatus === 'request'}
            setVisible={setVisible}
            onSubmit={handleCancel}
            disabled={activeOrders.acceptStatus === 'request'}
          />
        );
      default:
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="primary"
              onClick={handleAccept}
              loading={activeOrders.acceptStatus === 'request'}

            >
              Принять
            </Button>
            <CancelOrderButton
              btnType="danger"
              loading={activeOrders.cancelStatus === 'request'}
              setVisible={setVisible}
              onSubmit={handleCancel}
            />
          </div>
        );
    }
  };

  return (
    <Card
      style={{
        width: 300,
        margin: 10,
      }}
      actions={[
        <>
          <Link to={`/orders/${order.id}/`}>
            <Icon type="eye" />
          </Link>
        </>,
        <Popover
          style={{ bottom: 0 }}
          title="Действия"
          trigger="click"
          visible={visible}
          onVisibleChange={(visibility) => setVisible(visibility)}
          content={displayContent()}
          overlayStyle={{
            textAlign: 'center',
            width: 250,
          }}
        >
          <Icon type="ellipsis" />
        </Popover>,
      ]}
      bodyStyle={{ height: 300 }}
    >
      <Meta
        title={`# ${order.id}`}
      />
      {order.name === null ? null : (
        <div>
          <br />
            😃
          {order.name}
        </div>
      )}
      {order.phone === null ? null : `📞 +${order.phone}`}
      {order.rider_name === null ? null : (
        <div>
          <br />
          🚲
          {order.rider_name}
        </div>
      )}
      {order.rider_phone === null ? null : `📱 ${order.rider_phone}`}
      {order.kitchen === null ? null : `🏠 ${order.kitchen}`}
      {order.comment === null ? null : (
        <p>
          <span role="img" aria-label="">💬</span>
          {order.comment}
        </p>
      )}
      <p>
        <span style={{ marginBottom: 0 }} role="img" aria-label="">⏲</span>
        {moment(order.created_at).format('DD.MM.YYYY HH:mm')}
      </p>
      {order.latency === null ? null : (
        <p>
          <span role="img" aria-label="">🏃</span>
          <span style={{ color: 'red' }}>
            Опаздывает на
            {` ${order.latency} `}
            минут!!!
          </span>
        </p>
      )}
      {order.viewer === null ? null : (
        <p>
          <span role="img" aria-label="">👁</span>
          <strong>{order.viewer}</strong>
        </p>
      )}
    </Card>
  )
};

export default OrderCard;
