import React, { useEffect } from 'react';
import {
  Form,
  Icon,
  Button,
  Input
} from 'antd';

const ClientForm = (props) => {
  useEffect(() => {
    props.form.validateFields();
  });
  const { getClients } = props;
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      const { phone } = values;
      if (!err) {
        getClients({phone, per_page: 2});
      }
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
    <Form.Item>
      {getFieldDecorator('phone')(
        <Input
          prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
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

const WrappedForm = Form.create()(ClientForm);
export default WrappedForm;
