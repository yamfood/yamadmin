import React from 'react';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';

import { setOrderStateChanged } from '../../actions';

const formWrap = (Component) => {
  const FormWrapper = (props) => {
    const { form } = props;
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    };

    return (
      <Form
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
        onChange={(e) => {
          dispatch(setOrderStateChanged());
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
