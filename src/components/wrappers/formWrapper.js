import React from 'react';
import { Form } from 'antd';
import * as actions from '../actions';

const formWrap = (Component) => {
  const FormWrapper = (props) => {
    const { form } = props;

    const handleSubmit = (e) => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Component props={props} />
      </Form>
    )
  };

  return Form.create({
    name: 'formWrapper',
  })(FormWrapper);
};

export default formWrap;
