import React, { useState } from 'react';
import {
  Card,
  Icon,
  Statistic,
  Popover,
  Button,
} from 'antd';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

const { Meta } = Card;
const { Countdown } = Statistic;

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const activeOrders = ((state) => state.activeOrders);

  const [visible, setVisible] = useState(false);
  const deadline = new Date(order.created_at).getTime() + 1000 * 60 * 60 * 10;

  const handleAccept = async () => {
    await dispatch(actions.acceptOrder(order.id));
    setVisible(false);
  }
  const handleСancel = async () => {
    await dispatch(actions.cancelOrder(order.id));
    setVisible(false);
  };


  const content = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        type="primary"
        onClick={handleAccept}
        loading={activeOrders.acceptStatus === 'request'}

      >
          Принять
      </Button>
      <Button
        type="danger"
        onClick={handleСancel}
        loading={activeOrders.cancelStatus === 'request'}
      >
          Отменить
      </Button>
    </div>
  );

  return (
    <Card
      style={{ width: 300, margin: 10 }}
      actions={[
        <Icon type="eye" onClick={() => window.open(`/orders/${order.id}/`, '_blank')} />,
        <Popover
          title="Действия"
          trigger="click"
          visible={visible}
          onVisibleChange={(visibility) => setVisible(visibility)}
          content={content}
          overlayStyle={{
            textAlign: 'center',
            width: 250,
          }}
        >
          <Icon type="ellipsis" />
        </Popover>,
      ]}
    >
      <Meta
        title={`# ${order.id}`}
      />
      <br />
      😃
      <strong>{order.name}</strong>
      <br />
      📞+
      {order.phone}
      <br />
      <br />
      💰
      {order.total_sum.toLocaleString('ru')}
      сум
      <br />
      💬
      {order.comment}
      <br />
      <br />
      <Countdown prefix="⏱️" value={deadline} format="mm:ss" />
    </Card>
  )
};

export default withRouter(OrderCard);
