import React from 'react';
import {
  Form,
  Button,
  Input,
  Layout,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

const KitchenCreate = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const kitchens = useSelector((state) => state.kitchens);
  const { form } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.createKitchen({
          name: values.name,
          location: {
            longitude: parseFloat(values.longitude),
            latitude: parseFloat(values.latitude),
          },
        }));
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
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Создания Курьера</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Название">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Долгота (longitude)">
            {getFieldDecorator('longitude', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Широта (latitude)">
            {getFieldDecorator('latitude', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => history.push('/kitchens/')}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={kitchens.createStatus === 'request'}
              >
                Сохранить
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Content>
    </Layout>
  );
}

const WrappedForm = Form.create()(KitchenCreate);
export default WrappedForm;
