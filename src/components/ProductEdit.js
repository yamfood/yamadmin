import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Layout,
  Input,
  Select,
  Button,
} from 'antd';
import * as actions from '../actions';

const { Content } = Layout;

const mapStateToProps = (state) => ({
  products: state.products,
});

const actionCreators = {
  getCategory: actions.getCategory,
  getProductDetails: actions.getProductDetails,
  editProduct: actions.editProduct,
};

const ProductCreate = (props) => {
  const {
    form,
    getCategory,
    products,
    match,
    getProductDetails,
    editProduct,
  } = props;

  const { productDetails } = products;

  useEffect(() => {
    const productId = match.params.id;
    getProductDetails(productId);
    getCategory();
  }, [])

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        editProduct({
          ...values,
          price: parseInt(values.price, 10),
          energy: values.energy ? parseInt(values.energy, 10) : undefined,
        }, productDetails.id);
      }
    });
  };

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>Изменение продукта</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="URL Фото">
            {getFieldDecorator('photo', {
              initialValue: productDetails.photo ? productDetails.photo : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Уменьшенное изображение">
            {getFieldDecorator('thumbnail', {
              initialValue: productDetails.thumbnail
                ? productDetails.thumbnail : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Название">
            {getFieldDecorator('name', {
              initialValue: productDetails.name ? productDetails.name : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Цена">
            {getFieldDecorator('price', {
              initialValue: productDetails.price ? productDetails.price : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input type="number" disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Калорийность: ">
            {getFieldDecorator('energy', {
              initialValue: productDetails.energy ? productDetails.energy : null,
            })(
              <Input type="number" disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Категория: ">
            {getFieldDecorator('category_id', {
              initialValue: productDetails.category_id
                ? productDetails.category_id : null,
            })(
              <Select
                disabled={products.productDetailsStatus === 'request'}
                allowClear
              >
                {products.categories.map((category) => (
                  <Select.Option
                    value={category.id}
                    key={category.id}
                  >
                    {category.name}
                    {category.emoji}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => props.history.push('/products')}>
                  Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={products.productCreateStatus === 'request'}
              >
                Сохранить
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

const WrappedProductCreate = Form.create()(ProductCreate);

export default connect(
  mapStateToProps,
  actionCreators,
)(withRouter(WrappedProductCreate));
