import React from 'react';
import {
  Form,
  Button,
  Input,
  Layout,
  TimePicker,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;
const { TextArea } = Input;

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
        dispatch(actions.createKitchen(values));
      }
    });
  };

  const format = 'HH:mm';

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
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Создания Кухни</h1>
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
          <Form.Item label="Техническая информация">
            {getFieldDecorator('payload', {
              initialValue: '{ }',
            })(
              <TextArea
                autoSize={{ minRows: 4 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="Открывается">
            {getFieldDecorator('startAt')(
              <TimePicker
                format={format}
                placeholder="время"
              />,
            )}
          </Form.Item>
          <Form.Item label="Закрывается">
            {getFieldDecorator('endAt')(
              <TimePicker
                format={format}
                placeholder="время"
              />,
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
