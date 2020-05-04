import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Form,
  Layout,
  Input,
  Select,
  Button,
  Checkbox,
} from 'antd';
import { contentStyle } from '../assets/style';
import Title from './shared/Title';
import * as actions from '../actions';

const { Content } = Layout;

const ProductCreate = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const category = useSelector((state) => state.category);
  const { details } = category;
  const { form } = props;

  useEffect(() => {
    dispatch(actions.getCategoryDetails(id));
    dispatch(actions.getBotsId());
    dispatch(actions.setMenuActive(3));
  }, [])

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editCategoryDetails(values, id));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <Title headTitle="Категория: изменить" />
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Изменение категории</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Название [RU]">
            {getFieldDecorator('name_ru', {
              initialValue: details ? details.name.ru : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Название [UZ]">
            {getFieldDecorator('name_uz', {
              initialValue: details ? details.name.uz : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Название [EN]">
            {getFieldDecorator('name_en', {
              initialValue: details ? details.name.en : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Бот">
            {getFieldDecorator('bot_id', {
              initialValue: details ? details.bot_id : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Select
                disabled={category.botsRequestStatus === 'request'}
              >
                {category.botsList.map((bot) => (
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
          <Form.Item label="Позиция: ">
            {getFieldDecorator('position', {
              initialValue: details ? details.position : 0,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input type="number" />,
            )}
          </Form.Item>
          <Form.Item label="Эмоджи">
            {getFieldDecorator('emoji', {
              initialValue: details ? details.emoji : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Доставка">
            {getFieldDecorator('shipping', {
              initialValue: details ? details.is_delivery_free : null,
              valuePropName: 'checked',
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Checkbox> Бесплатно</Checkbox>,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button
                onClick={() => history.push('/products/categories/')}
                disabled={category.editRequestStatus === 'request'}
              >
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={category.editRequestStatus === 'request'}
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

const WrappedProductCreate = Form.create()(ProductCreate);
export default WrappedProductCreate;
