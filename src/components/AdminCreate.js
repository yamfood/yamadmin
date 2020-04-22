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
const AdminCreate = (props) => {
  const {
    form,
  } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(actions.getAdminPermissions());
    dispatch(actions.setMenuActive(9));
  }, []);

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.createAdmin({
          ...values,
          payload: {
            permissions: values.payload,
          },
        }));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Имя" disabled={admin.permissionStatus}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Login" disabled={admin.permissionStatus}>
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Pasword" disabled={admin.permissionStatus}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Permissions" disabled={admin.permissionStatus}>
            {getFieldDecorator('payload')(
              <Checkbox.Group>
                {admin.permissions.map((permission) => (
                  <Checkbox key={permission} value={permission}>{permission}</Checkbox>
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
                loading={admin.createAdminStatus === 'request'}
              >
                Создать
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

const WrappedForm = Form.create()(AdminCreate);
export default WrappedForm;
