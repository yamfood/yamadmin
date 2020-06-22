import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Button,
  Input,
} from 'antd';
import Title from './shared/Title';
import { getFinishedOrders, setMenuActive } from '../actions';

const OrdersFinishedForm = (props) => {
  const { form } = props;
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(getFinishedOrders(values));
      }
    });
  }

  useEffect(() => {
    dispatch(setMenuActive(8));
  }, []);

  return (
    <>
      <Title headTitle="Заказы: Завершенные" />
      <Form style={{ marginLeft: 15 }} layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="ID Заказа">
          {getFieldDecorator('order_id')(
            <Input type="number" style={{ width: 85 }} />,
          )}
        </Form.Item>
        <Form.Item label="Номер Клиента">
          {getFieldDecorator('client_phone')(
            <Input
              prefix="+"
              placeholder="Номер"
              type="number"
              style={{ width: 155 }}
            />,
          )}
        </Form.Item>
        <Form.Item label="Номер Курьера">
          {getFieldDecorator('rider_phone')(
            <Input
              prefix="+"
              placeholder="Номер"
              type="number"
              style={{ width: 155 }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Поиск
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const WrappedForm = Form.create()(OrdersFinishedForm);
export default WrappedForm;
