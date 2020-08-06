import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Button,
  Input,
} from 'antd';

const RiderWithdraw = (props) => {
  const dispatch = useDispatch();

  const {
    form,
    riderWithdraw,
    id,
    status,
  } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields(async (err, values) => {
      if (!err) {
        await dispatch(riderWithdraw({ amount: parseInt(values.amount, 10) }, id));
        form.resetFields();
      }
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item label="Вывод средств">
        {getFieldDecorator('amount')(
          <Input
            placeholder="Сумма вывода"
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
          Вывести
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedForm = Form.create()(RiderWithdraw);
export default WrappedForm;
