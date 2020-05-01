import {
  Button, Descriptions, Input, Table, Tag,
} from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import * as actions from '../actions';
import CancelOrderButton from './CancelOrderButton';
import OrderAvailableModal from './OrderAvailableModal';


const OrderDetailsView = (props) => {
  const dispatch = useDispatch();
  const activeOrders = useSelector((state) => state.activeOrders);
  const {
    order,
    form,
    editedState,
    editStatus,
  } = props;

  const handleCancel = (values) => {
    dispatch(actions.cancelOrder(order.id, values, '/orders/active/'));
  };

  const columns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
      render: (value, p, index) => {
        if (order.status === 'new') {
          return (
            <>
              {form.getFieldDecorator(`products[${index}].comment`, { initialValue: value })(<Input />)}
              {form.getFieldDecorator(`products[${index}].product_id`, { initialValue: p.id })(<Input type="hidden" />)}
            </>
          )
        }
        return value;
      },
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: '100px',
      render: (value, p, index) => {
        if (order.status === 'new') {
          return form.getFieldDecorator(
            `products[${index}].count`,
            { initialValue: value || 1 },
          )(<Input type="number" disabled={order.payment !== 'cash'} />)
        }
        return value;
      },
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price) => {
        if (price) {
          return price.toLocaleString('ru');
        }
        return null;
      },
    },
    {
      title: 'Итого',
      dataIndex: 'total',
      key: 'total',
      render: (price) => {
        if (price) {
          return price.toLocaleString('ru');
        }
        return null;
      },
    },
  ];

  const deleteColumn = {
    title: 'Удалить',
    dataIndex: 'delete',
    key: 'delete',
    width: '80px',
    render: (arg, record) => (
      <Button
        type="link"
        onClick={() => {
          dispatch(actions.setOrderStateChanged());
          dispatch(actions.removeOrderProduct({ orderId: order.id, productId: record.id }))
        }}
      >
        <DeleteOutlined />
      </Button>
    ),
  };

  const statusTag = ({ status }) => {
    switch (status) {
      case 'new':
        return <Tag color="#108ee9">Новый</Tag>;
      case 'onWay':
        return <Tag color="#F6F200">В пути</Tag>;
      case 'onKitchen':
        return <Tag color="#F6F200">На кухне</Tag>;
      case 'finished':
        return <Tag color="#00C01D">Завершен</Tag>;
      case 'canceled':
        return <Tag color="#FF2D00">Отменен</Tag>;
      default:
        return <Tag color="red">{order.status}</Tag>;
    }
  };


  const displayButtons = () => {
    if (editedState === 'changed') {
      return (
        <>
          <Button
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              location.reload();
              dispatch(actions.setOrderStateUnchanged());
            }}
            style={{ marginRight: 15 }}
          >
            Сбросить
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={editStatus === 'request'}
          >
            Сохранить
          </Button>
        </>
      )
    }
    return (
      <>
        <CancelOrderButton
          btnType="danger"
          loading={activeOrders.cancelStatus === 'request'}
          onSubmit={handleCancel}
          disabled={activeOrders.acceptStatus === 'request'}
        >
          Отменить
        </CancelOrderButton>
        {
          order.status === 'new' ? (
            <Button
              type="primary"
              onClick={() => dispatch(actions.acceptOrder(order.id, '/orders/active/'))}
              loading={activeOrders.acceptStatus === 'request'}
              disabled={activeOrders.cancelStatus === 'request'}
            >
              Принять
            </Button>
          ) : null
        }
      </>
    )
  };

  return (
    <div>
      {form.getFieldDecorator('orderId', { initialValue: order.id })(<Input type="hidden" />)}
      <Descriptions
        title={`Заказ # ${order.id}`}
        size="small"
        column={4}
        layout="vertical"
        bordered
      >
        <Descriptions.Item label="Локация" span={2}>
          <div id="map" style={{ width: '100%', height: 250 }} />
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={2}>
          {order.status === 'new'
            ? (
              form.getFieldDecorator(('address'), {
                initialValue: order.address,
              })(
                <Input.TextArea style={{ width: '100%', height: 250 }} />,
              )
            ) : order.address}
        </Descriptions.Item>
        <Descriptions.Item label="Комментарий" span={2}>
          {order.comment ? order.comment : 'Пусто...'}
        </Descriptions.Item>
        <Descriptions.Item label="Кухня" span={2}>{order.kitchen}</Descriptions.Item>
        <Descriptions.Item label="Клиент" span={1}>{order.name}</Descriptions.Item>
        <Descriptions.Item label="Телефон" span={1}>{order.phone}</Descriptions.Item>
        <Descriptions.Item label="Курьер" span={1}>
          {order.rider_name ? order.rider_name : 'Нет курьера'}
        </Descriptions.Item>
        <Descriptions.Item label="Телефон" span={1}>
          {order.rider_phone ? order.rider_phone : 'Нет курьера'}
        </Descriptions.Item>
        <Descriptions.Item label="Сумма" span={1}>
          {order.total_sum.toLocaleString('ru')}
          &nbsp;сум
        </Descriptions.Item>
        <Descriptions.Item label="Статус" span={1}>
          {statusTag(order)}
        </Descriptions.Item>
        <Descriptions.Item label="Тип оплаты" span={1}>
          {order.payment === 'cash' ? 'Наличными' : 'Картой'}
        </Descriptions.Item>
        <Descriptions.Item label="Создан в">{order.created_at}</Descriptions.Item>
        <Descriptions.Item label="Заметки" span={2}>
          {
            order.status === 'new'
              ? (
                form.getFieldDecorator(('notes'), {
                  initialValue: order.notes,
                })(
                  <Input.TextArea style={{ width: '100%', height: 50 }} />,
                )
              ) : order.notes
          }
        </Descriptions.Item>
        <Descriptions.Item label="Доставка">
          {
            order.status === 'new' && order.payment === 'cash'
              ? (
                form.getFieldDecorator(('delivery_cost'), {
                  initialValue: order.delivery_cost,
                })(
                  <Input style={{ width: '100%' }} type="number" />,
                )
              ) : order.delivery_cost
          }
        </Descriptions.Item>
      </Descriptions>

      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3><strong>Продукты</strong></h3>
        {
          order.status === 'new' && order.payment === 'cash'
            ? <OrderAvailableModal orderId={order.id} />
            : ''
        }
      </div>
      <Table
        dataSource={order.products.map((item) => ({
          ...item,
          key: item.id,
        }))}
        columns={order.status === 'new' && order.payment === 'cash' ? [...columns, deleteColumn] : columns}
        size="small"
        pagination={false}
        loading={editStatus === 'request'}
        footer={() => (
          <div style={{ textAlign: 'right', paddingRight: 10 }}>
            Итого:&nbsp;
            {order.total_sum.toLocaleString('ru')}
            &nbsp;сум
          </div>
        )}
        bordered
      />
      <div className="order-details-buttons" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }}>
        {displayButtons()}
      </div>
    </div>
  )
};

export default OrderDetailsView;
