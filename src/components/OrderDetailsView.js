import {
  Button, Descriptions, Input, Table, Tag,
} from 'antd';
import React from 'react';

const OrderDetailsView = (props) => {
  const { order, form, editedState } = props;

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
      render: (value, product, index) => {
        return (
          <>
            {form.getFieldDecorator(`products[${index}].comment`, { initialValue: value })(<Input />)}
            {form.getFieldDecorator(`products[${index}].product_id`, { initialValue: product.id })(<Input type="hidden" />)}
          </>
        )
      },
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      render: (value, product, index) => form.getFieldDecorator(`products[${index}].count`, { initialValue: value })(<Input type="number" />),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price) => price.toLocaleString('ru'),
    },
    {
      title: 'Итого',
      dataIndex: 'total',
      key: 'total',
      render: (price) => price.toLocaleString('ru'),
    },
  ];

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
          {
            form.getFieldDecorator(('address'), {
              initialValue: order.address,
            })(
              <Input.TextArea style={{ width: '100%', height: 250 }} />,
            )
          }
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
            form.getFieldDecorator(('notes'), {
              initialValue: order.notes,
            })(
              <Input.TextArea style={{ width: '100%', height: 50 }} />
            )
          }
        </Descriptions.Item>
        <Descriptions.Item label="Доставка">
          {
            form.getFieldDecorator(('delivery_cost'), {
              initialValue: order.delivery_cost,
            })(
              <Input style={{ width: '100%' }} type="number" />,
            )
          }
        </Descriptions.Item>
      </Descriptions>

      <br />
      <h3><strong>Продукты</strong></h3>
      <Table
        dataSource={order.products}
        columns={columns}
        size="small"
        pagination={false}
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
        <Button htmlType="submit" type="secondary" style={{ marginRight: 15 }}>Назад</Button>
        {
          editedState === 'changed'
            ? <Button htmlType="submit" type="primary">Сохранить</Button>
            : <Button htmlType="button" type="primary">Принять</Button>
        }
      </div>
    </div>
  )
};

export default OrderDetailsView;
