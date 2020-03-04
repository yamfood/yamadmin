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
  getRiderDetails: actions.getRiderDetails,
};

const { Content } = Layout;

const RidersForm = (props) => {
  const {
    form,
    match,
    editRider,
    getRiderDetails,
    riders,
  } = props;


  useEffect(() => {
    const riderID = match.params.id;
    getRiderDetails(riderID);
  }, []);

  const { getFieldDecorator } = form;


  const handleSubmit = (e) => {
    e.preventDefault();
    const { editRiderDetails } = riders;
    props.form.validateFields((err, values) => {
      if (!err) {
        editRider(values, editRiderDetails.id);
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
        <Form
          onSubmit={handleSubmit}
        >
          <Form.Item label="Tid">
            {getFieldDecorator('tid', {
              initialValue: riders.editRiderDetails.tid,
            })(
              <Input type="number" disabled={riders.riderDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Имя">
            {getFieldDecorator('name', {
              initialValue: riders.editRiderDetails.name,
            })(
              <Input disabled={riders.riderDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Сот.Тел">
            {getFieldDecorator('phone', {
              initialValue: riders.editRiderDetails.phone,
            })(
              <Input disabled={riders.riderDetailsStatus === 'request'} type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Заметки">
            {getFieldDecorator('notes', {
              initialValue: riders.editRiderDetails.notes,
            })(
              <Input disabled={riders.riderDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Блокирован">
            {getFieldDecorator('is_blocked', {
              initialValue: riders.editRiderDetails.is_blocked,
            })(
              <Switch disabled={riders.riderDetailsStatus === 'request'} defaultChecked={riders.editRiderDetails.is_blocked === true} />,
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
                loading={riders.editRiderStatus === 'request'}
                disabled={riders.riderDetailsStatus === 'request'}
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
  riders: state.riders,

});

const WrappedForm = Form.create()(RidersForm);
export default connect(
  mapStateToProps,
  actionsCreators,
)(withRouter(WrappedForm));
