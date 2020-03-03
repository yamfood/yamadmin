import React, { useEffect } from 'react';
import {
  Form,
  Button,
  Input,
  Switch,
  Layout,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

const actionsCreators = {
  editRider: actions.editRider,
};

const { Content } = Layout;

const RidersForm = (props) => {
  useEffect(() => {
    props.form.validateFields();
  });

  const { form, location } = props;
  const { getFieldDecorator } = form;
  const { state } = location;
  const {
    editRider,
    editStatus,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        editRider(values, state.id);
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
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Изменение</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Tid">
            {getFieldDecorator('tid', {
              initialValue: state.tid,
            })(
              <Input type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Имя">
            {getFieldDecorator('name', {
              initialValue: state.name,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Сот.Тел">
            {getFieldDecorator('phone', {
              initialValue: state.phone,
            })(
              <Input type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Нотес">
            {getFieldDecorator('notes', {
              initialValue: state.notes,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Блокирован">
            {getFieldDecorator('is_blocked', {
              initialValue: state.is_blocked,
            })(
              <Switch defaultChecked={state.is_blocked === true} />,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => props.history.push('/riders/')}>
                  Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={editStatus === 'request'}
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

const mapStateToProps = (state) => ({
  editStatus: state.riders.editRiderStatus,
});

const WrappedForm = Form.create()(RidersForm);
export default connect(
  mapStateToProps,
  actionsCreators,
)(withRouter(WrappedForm));
