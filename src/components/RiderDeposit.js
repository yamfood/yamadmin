import React from 'react';
import {
  Form,
  Button,
  Input,
} from 'antd';

const DepositForm = (props) => {
  const {
    form,
    editDeposit,
    id,
    status,
  } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        editDeposit({ amount: parseInt(values.amount, 10) }, id);
      }
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item label="Депозит">
        {getFieldDecorator('amount')(
          <Input
            placeholder="Депозит"
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
          Изменить
        </Button>
      </Form.Item>
    </Form>
  );
}

const WrappedForm = Form.create()(DepositForm);
export default WrappedForm;
