import React from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
  setOrderStateChanged,
  patchOrderDetails,
  getAvaialbeProducts,
  reasonInputUnClicked,
} from '../../actions';

const formWrap = (Component) => {
  const FormWrapper = (props) => {
    const { form } = props;
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);

    const handleSubmit = (e) => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          const preparedValues = {
            ...values,
            delivery_cost: Number(values.delivery_cost),
            products: values.products.map((product) => ({
              ...product,
              product_id: Number(product.product_id),
              count: Number(product.count),
            })),
          };
          dispatch(patchOrderDetails(values.orderId, preparedValues));
          dispatch(getAvaialbeProducts(values.orderId));
        }
      });
    };

    return (
      <Form
        onSubmit={handleSubmit}
        style={{ width: '100%', minHeight: '100%' }}
        onChange={() => {
          if (orderDetails.editedState === 'changed') {
            return ;
          }
          if (!orderDetails.isReasonClicked) {
            dispatch(setOrderStateChanged());
            dispatch(reasonInputUnClicked());
          }
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
