import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Button,
  TimePicker,
  Switch,
  Input,
  Select,
} from 'antd';
import moment from 'moment';
import * as actions from '../actions';

const { TextArea } = Input;
const format = 'HH:mm';


const KitchenEditForm = ({ form, id, history }) => {
  const kitchen = useSelector((state) => state.kitchens);
  const terminals = useSelector((state) => state.terminals);
  const { details } = kitchen;
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getKitchenDetails(id));
    dispatch(actions.setMenuActive(2));
    dispatch(actions.getBotsId());
    dispatch(actions.getTerminals());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields((err, values) => {
      let payload = details.payload;
      payload = JSON.stringify({
        ...payload,
        deliveryTerminalId: values.deliveryTerminalId,
      })

      if (!err) {
        dispatch(actions.editKitchen({
          ...values, payload, id,
        }))
      }
    });
  };

  return (
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
      <Form.Item label="Бот: " style={{ width: 200 }}>
        {getFieldDecorator('bot_id', {
          initialValue: details
            ? details.bot_id : null,
          rules: [{ required: true, message: 'Это обязательное поле' }],
        })(
          <Select
            disabled={kitchen.botsRequestStatus === 'request'}
            allowClear
          >
            {kitchen.botsList.map((bot) => (
              <Select.Option
                value={bot.id}
                key={bot.id}
              >
                {bot.name}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item label="Терминал: " style={{ width: 400 }}>
        {getFieldDecorator('deliveryTerminalId', {
          initialValue: details && details.payload
            ? details.payload.deliveryTerminalId : null,
          rules: [{ required: true, message: 'Это обязательное поле' }],
        })(
          <Select
            disabled={terminals.status === 'request'}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption
          >
            {terminals.list.map((terminal) => (
              <Select.Option
                value={terminal.deliveryTerminalId}
                key={terminal.deliveryTerminalId}
              >
                {terminal.deliveryRestaurantName}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item label="Открывается">
        {getFieldDecorator('start_at', {
          initialValue: details ? moment.utc(details.start_at, format).local() : null,
        })(
          <TimePicker
            format={format}
            placeholder="время"
          />,
        )}
      </Form.Item>
      <Form.Item label="Закрывается">
        {getFieldDecorator('end_at', {
          initialValue: details ? moment.utc(details.end_at, format).local() : null,
        })(
          <TimePicker
            format={format}
            placeholder="время"
          />,
        )}
      </Form.Item>
      <Form.Item label="Отключен">
        {getFieldDecorator('is_disabled', {
          initialValue: details.is_disabled,
          valuePropName: 'checked',
        })(
          <Switch
            disabled={kitchen.detailStatus === 'request'}
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

  );
};

const WrappedForm = Form.create()(KitchenEditForm);
export default WrappedForm;
