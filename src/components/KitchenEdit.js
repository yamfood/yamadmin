import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Layout,
  Button,
  TimePicker,
  Switch,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as actions from '../actions';

const { Content } = Layout;
const { TextArea } = Input;
const format = 'HH:mm';

const KitchenEdit = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const kitchen = useSelector((state) => state.kitchens);
  const { details } = kitchen;
  const { form, history } = props;
  const { getFieldDecorator } = form;

  useEffect(() => {
    dispatch(actions.getKitchenDetails(id));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editKitchen({ ...values, id }))
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
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Изменения Кухни</h1>
        <Form
          onSubmit={handleSubmit}
        >
          <Form.Item label="Название">
            {getFieldDecorator('name', {
              initialValue: details ? details.name : null,
            })(
              <Input disabled={kitchen.detailStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Долгота (longtitude)">
            {getFieldDecorator('longitude', {
              initialValue: details ? details.location.longitude : null,
            })(
              <Input disabled={kitchen.detailStatus === 'request'} type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Широта (latitude)">
            {getFieldDecorator('latitude', {
              initialValue: details ? details.location.latitude : null,
            })(
              <Input disabled={kitchen.detailStatus === 'request'} type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Техническая информация">
            {getFieldDecorator('payload', {
              initialValue: details ? JSON.stringify(details.payload) : null,
            })(
              <TextArea
                autoSize={{ minRows: 4 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="Открывается">
            {getFieldDecorator('start_at', {
              initialValue: details ? moment(details.start_at, 'HH:mm') : null,
            })(
              <TimePicker
                format={format}
                placeholder="время"
              />,
            )}
          </Form.Item>
          <Form.Item label="Закрывается">
            {getFieldDecorator('end_at', {
              initialValue: details ? moment(details.end_at, 'HH:mm') : null,
            })(
              <TimePicker
                format={format}
                placeholder="время"
              />,
            )}
          </Form.Item>
          <Form.Item label="Блокирован">
            {getFieldDecorator('is_disabled', {
              // initialValue: details ? details.is_disabled : null,
            })(
              <Switch
                disabled={kitchen.detailStatus === 'request'}
                defaultChecked={details.is_disabled === true}
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
                loading={kitchen.editStatus === 'request'}
                disabled={kitchen.detailStatus === 'request'}
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

const WrappedForm = Form.create()(KitchenEdit);
export default WrappedForm;
