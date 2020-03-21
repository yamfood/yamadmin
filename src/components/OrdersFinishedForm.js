import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Button,
  Input,
} from 'antd';
import { getFinishedOrders } from '../actions';

const OrdersFinishedForm = (props) => {
  const { form } = props;
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('this is values: ', values);
        dispatch(getFinishedOrders(values));
      }
    });
  }

  return (
    <Form style={{ marginLeft: 15 }} layout="inline" onSubmit={handleSubmit}>
      <Form.Item label="ID Заказа">
        {getFieldDecorator('order_id')(
          <Input type="number" />,
        )}
      </Form.Item>
      <Form.Item label="Номер Клиента">
        {getFieldDecorator('client_phone')(
          <Input
            prefix="+"
            placeholder="Номер"
            type="number"
          />,
        )}
      </Form.Item>
      <Form.Item label="Номер Курьера">
        {getFieldDecorator('rider_phone')(
          <Input
            prefix="+"
            placeholder="Номер"
            type="number"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Поиск
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedForm = Form.create()(OrdersFinishedForm);
export default WrappedForm;
