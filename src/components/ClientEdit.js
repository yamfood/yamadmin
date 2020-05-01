import React, { useEffect } from 'react';
import {
  Layout,
  Descriptions,
  Form,
  Input,
  Switch,
  Button,
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

  useEffect(() => {
    dispatch(actions.getClientDetails(id));
    dispatch(actions.setMenuActive(4));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editClientDetails(id, values));
      }
    });
  };

  const handleBlocked = () => {
    if (detailsData[id]) {
      if (detailsData[id].is_blocked) {
        return 'checked';
      }
    }
    return null;
  }

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <Form
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
                  <Input disabled={clients.detailsStatus === 'request'} />,
                )}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Телефон">
              <Form.Item>
                {getFieldDecorator('phone', {
                  initialValue: detailsData[id] ? detailsData[id].phone : null,
                })(
                  <Input type="number" disabled={clients.detailsStatus === 'request'} />,
                )}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Tid">
              {detailsData[id] ? detailsData[id].tid : null}
            </Descriptions.Item>
            <Descriptions.Item label="Блокирован">
              <Form.Item>
                {getFieldDecorator('is_blocked', {
                  initialValue: detailsData[id] ? detailsData[id].is_blocked : null,
                  valuePropName: 'checked',
                })(
                  <Switch disabled={clients.detailsStatus === 'request'} defaultChecked={handleBlocked()} />,
                )}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Data">
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
          </Descriptions>
          <Form.Item>
            <div style={clientEditButtonsStyle}>
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
      </Content>
    </Layout>
  );
}

const WrappedClientForm = Form.create()(ClientDetails);
export default WrappedClientForm;
