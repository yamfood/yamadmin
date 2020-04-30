import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input, Button,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeSettingModal, editParameters } from '../actions';

const ParamsEditModal = ({ form }) => {
  const dispatch = useDispatch();
  const param = useSelector((state) => state.params);
  const { editParam } = param;
  const [isVisible, setVisible] = useState(param.isEditVisible);
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await dispatch(editParameters(editParam.id, values));
        form.resetFields();
      }
    });
  };

  useEffect(() => {
    setVisible(param.isEditVisible);
  }, [param.isEditVisible])

  const handleCancel = () => {
    dispatch(closeSettingModal());
  };

  return (
    <Modal
      title={`Изменить "${editParam.name}"`}
      visible={isVisible}
      footer={null}
      closable={false}
      confirmLoading={param.editStatus === 'request'}
    >
      <Form onSubmit={handleSubmit}>
        <p>{editParam.docs || ''}</p>
        <Form.Item>
          {getFieldDecorator('value', {
            initialValue: editParam.value,
          })(
            <Input />,
          )}
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item>
            <Button onClick={handleCancel} disabled={param.editStatus === 'request'}>
              Назад
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginLeft: 10 }}
              type="primary"
              htmlType="submit"
              loading={param.editStatus === 'request'}
            >
              Сохранить
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(ParamsEditModal);
export default WrappedModal;
