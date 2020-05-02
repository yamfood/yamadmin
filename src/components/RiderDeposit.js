import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Button,
  Input,
} from 'antd';

const RiderDeposit = (props) => {
  const dispatch = useDispatch();

  const {
    form,
    editDeposit,
    id,
    status,
  } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields(async (err, values) => {
      if (!err) {
        await dispatch(editDeposit({ amount: parseInt(values.amount, 10) }, id));
        form.resetFields();
      }
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item label="Баланс">
        {getFieldDecorator('amount')(
          <Input
            placeholder="Баланс"
            type="number"
            disabled={status === 'request'}
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={status === 'request'}
        >
          Пополнить
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedForm = Form.create()(RiderDeposit);
export default WrappedForm;
