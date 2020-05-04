import React, { useEffect } from 'react';
import {
  Form,
  Button,
  Input,
  Switch,
  Layout,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;

const RidersForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const riders = useSelector((state) => state.riders);
  const {
    form,
    match,
  } = props;


  useEffect(() => {
    const riderID = match.params.id;
    dispatch(actions.getRiderDetails(riderID));
    dispatch(actions.setMenuActive(6));
  }, []);

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { editRiderDetails } = riders;
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editRider(
          {
            ...values,
          },
          editRiderDetails.id,
        ));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>Изменение курьера</h1>
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
              valuePropName: 'checked',
            })(
              <Switch
                disabled={riders.riderDetailsStatus === 'request'}
              />,
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

const WrappedForm = Form.create()(RidersForm);
export default WrappedForm;
