import React, { useEffect, useState } from 'react';
import {
  Layout,
  Descriptions,
  Form,
  Input,
  Switch,
  Button, Spin, Tooltip,
} from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contentStyle, clientEditButtonsStyle } from '../assets/style';
import * as actions from '../actions';


const { Content } = Layout;

const ClientDetails = ({ form }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const clients = useSelector((state) => state.clients);
  const { detailsData } = clients;
  const { getFieldDecorator } = form;
  const [formChangeState, setFormChangeState] = useState(false);
  const [tooltipHover, setTooltipHover] = useState(false);
  useEffect(() => {
    dispatch(actions.getClientDetails(id));
    dispatch(actions.setMenuActive(5));
  }, []);

  useEffect(() => {
    if (detailsData) {
      setFormChangeState(false)
    }
  }, [detailsData])

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editClientDetails(id, values));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <Spin spinning={clients.detailsStatus === 'request'}>
          <Form
            onChange={() => {
              setFormChangeState(true);
            }}
            onSubmit={handleSubmit}
          >
            <Descriptions
              title={`Клиент #${id}`}
              size="small"
              column={4}
              layout="vertical"
              bordered
            >
              <Descriptions.Item label="Имя">
                <Form.Item>
                  {getFieldDecorator('name', {
                    initialValue: detailsData[id] ? detailsData[id].name : null,
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Телефон">
                <Form.Item>
                  {getFieldDecorator('phone', {
                    initialValue: detailsData[id] ? detailsData[id].phone : null,
                  })(
                    <Input type="number" />,
                  )}
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Tid">
                {detailsData[id] ? detailsData[id].tid : null}
              </Descriptions.Item>
              <Descriptions.Item label="Блокирован">
                <Form.Item>
                  {getFieldDecorator('is_blocked', {
                    onChange: () => setFormChangeState(true),
                    initialValue: detailsData[id] ? detailsData[id].is_blocked : null,
                    valuePropName: 'checked',
                  })(
                    <Switch />,
                  )}
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Data" span={2}>
                <ul>
                  {detailsData[id] ? (
                    detailsData[id].data.map((detail) => (
                      <li key={detail.label}>
                        <b>
                          {detail.label}
                          :
                        </b>
                        {detail.value}
                      </li>
                    ))
                  ) : null}
                </ul>
              </Descriptions.Item>
              <Descriptions.Item label="Бот" span={2}>
                {detailsData[id] ? detailsData[id].bot : null}
              </Descriptions.Item>
            </Descriptions>
            <Form.Item>
              <div style={clientEditButtonsStyle}>
                <div style={{ marginRight: 'auto' }}>
                  <Tooltip
                    visible={tooltipHover && formChangeState}
                    title="Сначала сохраните изменения"
                  >
                    <div
                      onMouseEnter={() => setTooltipHover(true)}
                      onMouseLeave={() => setTooltipHover(false)}
                    >
                      <Button
                        onClick={() => history.push(`/orders/new?client_id=${id}`)}
                        htmlType="submit"
                        type="primary"
                        disabled={formChangeState}
                      >
                        Создать новый заказ
                      </Button>
                    </div>
                  </Tooltip>
                </div>
                <Button
                  onClick={() => history.push('/clients/')}
                  style={{ marginRight: 10 }}
                  disabled={clients.editStatus === 'request'}
                >
                  Отменить
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={clients.editStatus === 'request'}
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
