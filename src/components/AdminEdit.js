import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;

const AdminEdit = (props) => {
  const {
    form,
  } = props;

  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const history = useHistory();

  const { editingAdminDetails } = admins;

  useEffect(() => {
    dispatch(actions.getAdminPermissions());
    dispatch(actions.setMenuActive(10));
  }, []);

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(
          actions.editAdmin({
            ...values,
            payload: {
              permissions: values.payload,
            },
          }, editingAdminDetails.id),
        );
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Изменение администратора</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Имя">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
              initialValue: editingAdminDetails ? editingAdminDetails.name : null,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Логин">
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
              initialValue: editingAdminDetails ? editingAdminDetails.login : null,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Пароль">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
              initialValue: editingAdminDetails ? editingAdminDetails.password : null,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Номер">
            {getFieldDecorator('number', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
              initialValue: editingAdminDetails ? editingAdminDetails.number : null,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Доступ">
            {getFieldDecorator('payload', {
              initialValue: editingAdminDetails.payload.permissions
                ? editingAdminDetails.payload.permissions : null,
            })(
              <Checkbox.Group>
                {admins.permissions.map((permission) => (
                  <Checkbox
                    key={permission}
                    value={permission}
                  >
                    {permission}
                  </Checkbox>
                ))}
              </Checkbox.Group>,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => history.push('/admins/')}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={admins.editAdminStatus === 'request'}
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

const WrappedForm = Form.create()(AdminEdit);
export default WrappedForm;
