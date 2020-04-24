import React, { useState } from 'react';
import {
  Tag,
  Descriptions,
  Table,
  Input,
  Button,
  Form,
} from 'antd';


const OrderDetailsView = (props) => {
  const { order, form } = props;
  const { status } = order;
  const { getFieldDecorator } = form;
  const columns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment, product) => {
        if (status === 'new') {
          return (
            <Form.Item style={{ marginTop: 15 }}>
              {getFieldDecorator(`comment${product.name}`, {
                initialValue: comment ? comment : null,
              })(
                <Input />,
              )}
            </Form.Item>
          );
        }
        return comment;
      },
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      render: (count, product) => {
        if (status === 'new') {
          return (
            <Form.Item style={{ marginTop: 15 }}>
              {getFieldDecorator(`count${product.name}`, {
                initialValue: count ? count : null,
              })(
                <Input type="number" />,
              )}
            </Form.Item>
          );
        }
        return count;
      },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('values; ', values);
        /*
        "products": [
           {
            "product_id": 35,
            "comment": "ААААА",
              "count": 1
            }
           ],
          "address": "Test",
          "notes": "TEEEEEEEEEEEESTTT",
          "delivery_cost": 5000
        */
        // {
        //   'products'
        // }
      }
    });
  };

  const statusTag = (order) => {
    switch (order.status) {
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
      <Form onSubmit={handleSubmit}>
        <Descriptions
          title={`Заказ # ${order.id}`}
          size="small"
          column={4}
          layout="vertical"
          bordered
        >
          <Descriptions.Item label="Локация" span={2}>
            <div id="map" style={{ width: '100%', height: 250 }}></div>
          </Descriptions.Item>
          <Descriptions.Item label="Адрес" span={2}>
            {status === 'new'
              ? (
                <Form.Item style={{ marginTop: 5 }}>
                  {getFieldDecorator('address', {
                    initialValue: order.address ? order.address : null,
                  })(
                    <Input.TextArea />,
                  )}
                </Form.Item>
              )
              : order.address}
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
          сум
          </Descriptions.Item>
          <Descriptions.Item label="Статус" span={1}>
            {statusTag(order)}
          </Descriptions.Item>
          <Descriptions.Item label="Тип оплаты" span={1}>
            {order.payment === 'cash' ? 'Наличными' : 'Картой'}
          </Descriptions.Item>
          <Descriptions.Item label="Создан в">{order.created_at}</Descriptions.Item>
          <Descriptions.Item label="Заметки" span={2}>
            {status === 'new'
              ? (
                <Form.Item style={{ marginTop: 5 }}>
                  {getFieldDecorator('notes', {
                    initialValue: order.notes ? order.notes : null,
                  })(
                    <Input.TextArea />,
                  )}
                </Form.Item>
              )
              : order.notes}
          </Descriptions.Item>
          <Descriptions.Item label="Доставка">
            {status === 'new'
              ? (
                <Form.Item style={{ marginTop: 5 }}>
                  {getFieldDecorator('delivery_cost', {
                    initialValue: order.delivery_cost ? order.delivery_cost : null,
                  })(
                    <Input type="number" />,
                  )}
                </Form.Item>
              )
              : order.delivery_cost}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <h3><strong>Продукты</strong></h3>
        <Table
          dataSource={order.products.map((product) => {
            return {
              ...product,
              key: product.id,
            }
          })}
          columns={columns}
          size="small"
          pagination={false}
          footer={() => (
            <div style={{ textAlign: 'right', paddingRight: 10 }}>
              Итого: {order.total_sum.toLocaleString('ru')} сум
            </div>
          )}
          bordered
        />
        {status === 'new'
          ? (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <Button style={{ marginTop: 4 }}>
                Назад
              </Button>
              <Form.Item>
                <Button
                  style={{ marginLeft: 10 }}
                  type="primary"
                  htmlType="submit"
                >
                  Сохранить
                </Button>
              </Form.Item>
            </div>
          ) : null}
      </Form>
    </div>
  )
};

const WrapperForm = Form.create()(OrderDetailsView);
export default WrapperForm;
