import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
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
    // console.log('editParam.value: ', editParam.value);
  }, [param.isEditVisible])

  const handleCancel = () => {
    dispatch(closeSettingModal());
  };

  return (
    <Form>
      <Modal
        title={editParam.name}
        visible={isVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={param.editStatus === 'request'}
      >
        <p>{editParam.docs || 'docs here'}</p>
        <Form.Item>
          {getFieldDecorator('value', {
            initialValue: editParam.value,
          })(
            <Input />,
          )}
        </Form.Item>
      </Modal>
    </Form>
  );
}

const WrappedModal = Form.create()(ParamsEditModal);
export default WrappedModal;
