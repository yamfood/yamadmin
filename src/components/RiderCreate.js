import React from 'react';
import {
  Form,
  Button,
  Input,
  Layout,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

const actionsCreators = {
  createRider: actions.createRider,
};

const { Content } = Layout;

const CreateRider = (props) => {
  const { form } = props;
  const { getFieldDecorator } = form;
  const {
    createRider,
    createStatus,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        createRider({ ...values, phone: parseInt(values.phone, 10) }, props.history.push);
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
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Создания Курьера</h1>
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
              <Input type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Нотес">
            {getFieldDecorator('notes')(
              <Input />,
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

const mapStateToProps = (state) => ({
  createStatus: state.riders.createRiderStatus,
});

const WrappedForm = Form.create()(CreateRider);
export default connect(
  mapStateToProps,
  actionsCreators,
)(withRouter(WrappedForm));
