import React, { useEffect, useState } from 'react';
import {
  Layout,
  Descriptions,
  Form,
  Input,
  Button, Spin, Select,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contentStyle, clientEditButtonsStyle } from '../assets/style';
import * as actions from '../actions';


const { Content } = Layout;

const ClientDetails = ({ form }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const clients = useSelector((state) => state.clients);
  const errors = clients.createErrors;
  const bots = useSelector((state) => state.bots);
  const formLoading = bots.status === 'request';
  const formUploading = clients.status === 'request';
  const { getFieldDecorator } = form;
  const [alreadyExist, setAlreadyExist] = useState(false)

  useEffect(() => {
    dispatch(actions.getBots());
    dispatch(actions.setMenuActive(5));
  }, []);

  useEffect(() => {
    if (errors) {
      setAlreadyExist(Object.values(errors)
        .reduce((acc, errs) => [...acc, ...errs], [])
        .includes('Уже зарегистрирован для данного бота'));

      const fields = Object.keys(errors)?.reduce((acc, k) => ({
        ...acc,
        [k]: {
          value: form.getFieldValue(k),
          errors: errors[k].map((err) => new Error(err)),
        },
      }), {});
      if (Object.keys(fields).length > 0) {
        form.setFields(fields)
      }
    }
  }, [errors])

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.createClient(values));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <Spin spinning={formLoading}>
          <Form
            onChange={() => {
            }}
            onSubmit={handleSubmit}
          >
            <Descriptions
              title="Новый Клиент"
              size="small"
              column={4}
              layout="vertical"
              bordered
            >
              <Descriptions.Item label="Имя">
                <Form.Item style={{ width: '100%', minWidth: '10vw' }}>
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true,
                      message: 'Это обязательное поле',
                    }],
                  })(
                    <Input disabled={formLoading || formUploading} />,
                  )}
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Телефон">
                <Form.Item style={{ width: '100%', minWidth: '10vw' }}>
                  {getFieldDecorator('phone', {
                    rules: [{
                      required: true,
                      message: 'Это обязательное поле',
                    },
                    { min: 12, message: 'Номер в формате 99890000000' }],
                  })(
                    <Input type="number" disabled={formLoading || formUploading} />,
                  )}
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Бот" span={2}>
                <Form.Item style={{ width: '100%', minWidth: '10vw' }}>
                  {getFieldDecorator('bot_id', {
                    rules: [{
                      required: true,
                      message: 'Это обязательное поле',
                    }],
                  })(
                    <Select
                      disabled={formLoading || formUploading}
                      allowClear
                    >
                      {bots.list.map((bot) => (
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
              </Descriptions.Item>
            </Descriptions>
            <Form.Item>
              <div style={clientEditButtonsStyle}>
                <Button
                  style={{ marginRight: 'auto' }}
                  onClick={() => history.push(`/clients/${clients.conflictingClientId}`)}
                  htmlType="submit"
                  type="primary"
                  disabled={!alreadyExist || !clients.conflictingClientId}
                >
                  Изменить существующий
                </Button>
                <Button
                  onClick={() => history.push('/clients/')}
                  style={{ marginRight: 10 }}
                  disabled={formUploading}
                >
                  Отменить
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={formUploading}
                >
                  Сохранить
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Spin>
      </Content>
    </Layout>
  );
}

const WrappedClientForm = Form.create()(ClientDetails);
export default WrappedClientForm;
