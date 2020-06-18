import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Layout,
  Input,
  Button,
} from 'antd';

import { contentStyle } from '../assets/style';
import * as actions from '../actions';

const { Content } = Layout;

const ProductModifierEdit = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modifiers = useSelector((state) => state.modifiers);

  const { form, match } = props;

  const { modifierDetails, modifierDetailsStatus, editModifierStatus } = modifiers;

  useEffect(() => {
    const productId = match.params.id;
    dispatch(actions.getModifierDetails(productId));
    dispatch(actions.setMenuActive(5));
  }, [])

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.editModifier(values, modifierDetails.id));
      }
    });
  };

  return (
    <Layout>
      <Content
        style={contentStyle}
      >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>Изменение модификатора</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Название [RU]">
            {getFieldDecorator('name_ru', {
              initialValue: modifierDetails.name ? modifierDetails.name.ru : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={modifierDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Название [UZ]">
            {getFieldDecorator('name_uz', {
              initialValue: modifierDetails.name ? modifierDetails.name.uz : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={modifierDetailsStatus === 'request'} />,
            )}
          </Form.Item>
          <Form.Item label="Название [EN]">
            {getFieldDecorator('name_en', {
              initialValue: modifierDetails.name ? modifierDetails.name.en : null,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input disabled={modifierDetailsStatus === 'request'} />,
            )}

          </Form.Item>
          <Form.Item label="Цена">
            {getFieldDecorator('price', {
              initialValue: modifierDetails?.price,
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input type="number" disabled={modifierDetailsStatus === 'request'} />,
            )}
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => history.push('/products/modifiers')}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={editModifierStatus === 'request'}
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

const WrappedProductCreate = Form.create()(ProductModifierEdit);
export default WrappedProductCreate;
