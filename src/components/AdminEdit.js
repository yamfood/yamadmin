import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

// const mapStateToProps = (state) => ({
//   admins: state.admins,
// });

// const actionCreators = {
//   getAdminPermissions: actions.getAdminPermissions,
//   editAdmin: actions.editAdmin,
// }

const AdminEdit = (props) => {
  const {
    form,
  } = props;

  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);

  const { editingAdminDetails } = admins;

  useEffect(() => {
    dispatch(actions.getAdminPermissions());
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
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Login">
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
              initialValue: editingAdminDetails ? editingAdminDetails.login : null,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Pasword">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
              initialValue: editingAdminDetails ? editingAdminDetails.password : null,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Permissions">
            {getFieldDecorator('payload', {
              initialValue: editingAdminDetails.payload.permissions
                ? editingAdminDetails.payload.permissions : null,
            })(
              <Checkbox.Group>
                {admins.permissions.map((permission) => (
                  <Checkbox
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
              <Button onClick={() => props.history.push('/admins/')}>
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
                Изменить
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

const WrappedForm = Form.create()(AdminEdit);
export default withRouter(WrappedForm);
