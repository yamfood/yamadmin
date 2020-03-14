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
  createProduct: actions.createProduct,
};

const ProductCreate = (props) => {
  const {
    form,
    getCategory,
    products,
    createProduct,
  } = props;

  useEffect(() => {
    getCategory();
  }, [])

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        createProduct({
          ...values,
          price: parseInt(values.price, 10),
          energy: values.energy ? parseInt(values.energy, 10) : undefined,
          category_id: values.category_id ? parseInt(values.category_id, 10) : undefined,
        });
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
          minHeight: 'auto',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Создание продукта</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="URL Фото">
            {getFieldDecorator('photo', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Уменьшенное изображение">
            {getFieldDecorator('thumbnail', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Название">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Цена">
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Калорийность: ">
            {getFieldDecorator('energy')(
              <Input type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Категория: ">
            {getFieldDecorator('category_id')(
              <Select>
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
