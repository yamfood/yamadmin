import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Layout,
  Input,
  Select,
  Button,
} from 'antd';

import FileUploader from './shared/FileUploader'
import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;

const ProductCreate = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((state) => state.products);
  const [getSignedURLStatus, uploadStatus] = useSelector(
    (state) => [state.products.getSignedURLStatus, state.products.uploadStatus],
  );

  const { form, match } = props;

  const { productDetails } = products;

  useEffect(() => {
    const productId = match.params.id;
    dispatch(actions.getProductDetails(productId));
    dispatch(actions.getCategory());
    dispatch(actions.setMenuActive(3));
  }, [])

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editProduct(values, productDetails.id));
      }
    });
  };

  const onUpload = async (folder, file) => dispatch(actions.getSignedURL(folder, file));

  const isUploadLoading = [getSignedURLStatus, uploadStatus, products.productDetailsStatus].includes('request');

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>Изменение продукта</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="URL Фото">
            {getFieldDecorator('photo', {
              initialValue: productDetails.photo ? productDetails.photo : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <FileUploader
                onUpload={onUpload}
                folder="products"
                accept=".png,.jpg"
                loading={isUploadLoading}
              />,
            )}
          </Form.Item>
          <hr />
          <Form.Item label="Уменьшенное изображение">
            {getFieldDecorator('thumbnail', {
              initialValue: productDetails.thumbnail
                ? productDetails.thumbnail : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <FileUploader
                onUpload={onUpload}
                folder="products"
                accept=".png,.jpg"
                loading={isUploadLoading}
              />,
            )}
          </Form.Item>
          <hr />
          <Form.Item label="Название [RU]">
            {getFieldDecorator('name_ru', {
              initialValue: productDetails.name ? productDetails.name.ru : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Описание [RU]">
            {getFieldDecorator('description_ru', {
              initialValue: productDetails.description ? productDetails.description.ru : '',
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <hr />
          <Form.Item label="Название [UZ]">
            {getFieldDecorator('name_uz', {
              initialValue: productDetails.name ? productDetails.name.uz : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Описание [UZ]">
            {getFieldDecorator('description_uz', {
              initialValue: productDetails.description ? productDetails.description.uz : '',
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <hr />
          <Form.Item label="Название [EN]">
            {getFieldDecorator('name_en', {
              initialValue: productDetails.name ? productDetails.name.en : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Описание [EN]">
            {getFieldDecorator('description_en', {
              initialValue: productDetails.description ? productDetails.description.en : '',
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={products.productDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <hr />
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
          <Form.Item label="Позиция: ">
            {getFieldDecorator('position', {
              initialValue: productDetails.position ? productDetails.position : 0,
            })(
              <Input type="number" />,
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
              <Button onClick={() => history.push('/products')}>
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
export default WrappedProductCreate;
