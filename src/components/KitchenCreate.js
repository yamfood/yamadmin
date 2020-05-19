import React, { useEffect } from 'react';
import {
  Form,
  Button,
  Input,
  Layout,
  TimePicker,
  Select,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;
const { TextArea } = Input;

const KitchenCreate = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const kitchens = useSelector((state) => state.kitchens);
  const terminals = useSelector((state) => state.terminals);
  const { form } = props;
  const { getFieldDecorator } = form;
  const format = 'HH:mm';

  useEffect(() => {
    dispatch(actions.setMenuActive(2));
    dispatch(actions.getBotsId());
    dispatch(actions.getTerminals());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        const payload = JSON.stringify({ deliveryTerminalId: values.deliveryTerminalId });
        dispatch(actions.createKitchen({ ...values, payload }));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Создание кухни</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Название">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Долгота (longitude)">
            {getFieldDecorator('longitude', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Широта (latitude)">
            {getFieldDecorator('latitude', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Бот: " style={{ width: 200 }}>
            {getFieldDecorator('bot_id', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Select
                disabled={kitchens.botsRequestStatus === 'request'}
                allowClear
              >
                {kitchens.botsList.map((bot) => (
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
              initialValue: null,
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
            {getFieldDecorator('startAt')(
              <TimePicker
                defaultOpenValue={moment('09:00:00', format)}
                format={format}
                placeholder="время"
              />,
            )}
          </Form.Item>
          <Form.Item label="Закрывается">
            {getFieldDecorator('endAt')(
              <TimePicker
                defaultOpenValue={moment('23:00:00', format)}
                format={format}
                placeholder="время"
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
                loading={kitchens.createStatus === 'request'}
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

const WrappedForm = Form.create()(KitchenCreate);
export default WrappedForm;
