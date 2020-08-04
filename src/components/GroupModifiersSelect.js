import { Select, Form } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setOrderStateChanged } from '../actions';


function GroupModifiersSelect(props) {
  const dispatch = useDispatch()
  const {
    allGroupModifiers, product, disabled, form, index,
  } = props;

  return allGroupModifiers?.map((gm) => {
    const selectedModifiers = product.payload.modifiers
      ?.map((mId) => gm.modifiers[mId])
      ?.filter((modifier) => modifier)
      ?.map((modifier) => ({ key: modifier.id, label: modifier.name }));

    return (
      <Form.Item key={gm.id}>
        {form.getFieldDecorator(`products.${product.id}[${product.index}].groupModifiers[${gm.id}]`, {
          initialValue: selectedModifiers,
          rules: [{ required: gm.required, message: 'Это обязательное поле' }],
          onChange: (_) => dispatch(setOrderStateChanged()),
        })(
          <Select
            placeholder="Выберите модификаторы"
            labelInValue
            mode="multiple"
            disabled={disabled}
            allowClear
            style={{ marginBottom: 8 }}
          >
            {Object.keys(gm.modifiers)
              .filter(
                (mId) => !(form.getFieldValue(`products.${product.id}[${product.index}].groupModifiers[${gm.id}]`)
                || selectedModifiers)
                ?.map((x) => x.key)
                .includes(mId),
              )
            ?.map((mId) => (
              <Select.Option
                value={gm.modifiers[mId].id}
                key={gm.modifiers[mId].id}
                title={gm.modifiers[mId].name}
              >
                {gm.modifiers[mId].name}
              </Select.Option>
            ))}
          </Select>,
        )}

      </Form.Item>
    )
  })
}

export default GroupModifiersSelect;
