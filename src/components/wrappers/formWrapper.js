import React from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const formWrap = (Component, onSuccess, onChange) => {
  const FormWrapper = (props) => {
    const { form } = props;
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const handleSubmit = (e) => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          if (onSuccess) onSuccess(values, dispatch, state)
        }
      });
    };

    return (
      <Form
        onSubmit={handleSubmit}
        style={{ width: '100%', minHeight: '100%' }}
        onChange={(e) => {
          if (onChange) onChange(e, dispatch, state)
        }}
      >
        <Component {...props} />
      </Form>
    )
  };

  return Form.create({
    name: 'formWrapper',
  })(FormWrapper);
};

export default formWrap;
