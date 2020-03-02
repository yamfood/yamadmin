/* eslint-disable */
import React, { useEffect } from 'react';
import {
  Form,
  Button,
  Input
} from 'antd';

const PhoneSearchForm = (props) => {
  useEffect(() => {
    props.form.validateFields();
  });
  const { getByPhone } = props;
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      const { phone } = values;
      if (!err) {
        getByPhone({ phone });
      }
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
    <Form.Item>
      {getFieldDecorator('phone')(
        <Input
          prefix="+"
          placeholder="Phone"
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
}

const WrappedForm = Form.create()(PhoneSearchForm);
export default WrappedForm;
