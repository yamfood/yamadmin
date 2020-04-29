import React, { useEffect } from 'react';
import {
  Form,
  Button,
  Input,
  Layout,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;

const CreateRider = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const createStatus = useSelector((state) => state.riders.createRiderStatus);

  useEffect(() => {
    dispatch(actions.setMenuActive(5));
  }, [])

  const { form } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.createRider({ ...values, phone: parseInt(values.phone, 10) }));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>Создание курьера</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Имя">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Сот.Тел">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input
                type="number"
                prefix="+"
              />,
            )}
          </Form.Item>
          <Form.Item label="Заметки">
            {getFieldDecorator('notes')(
              <Input />,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => history.push('/riders/')}>
                  Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={createStatus === 'request'}
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

const WrappedForm = Form.create()(CreateRider);
export default WrappedForm;
