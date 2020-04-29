import React, { useState, useImperativeHandle } from 'react';
import {
  Modal, Form, Input, Button,
} from 'antd';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';


const ModalCancelOrderForm = React.forwardRef(({
  visible,
  onCancel,
  onOk,
  form,
}, ref) => {
  useImperativeHandle(ref, () => ({
    form,
  }));

  const { getFieldDecorator } = form;

  return (
    <Modal
      visible={visible}
      title="Комментарий к отмене"
      okText="Принять"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form layout="vertical" itemRef={ref}>
        <Form.Item label="Причина отказа">
          {getFieldDecorator('reason')(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

const WrappedModalCancelOrderForm = Form.create({
  name: 'modalForm',
})(ModalCancelOrderForm);

const CancelOrderButton = ({
  btnType,
  loading,
  setVisible,
  onSubmit,
  disabled,
}) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(actions.reasonInputClicked());
    if (setVisible) {
      setVisible(false);
    }
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };

  const formRef = React.createRef();

  const handleSubmit = () => {
    const { form } = formRef.current;
    form.validateFields((err, values) => {
      if (err) return;
      onSubmit(values);
      form.resetFields();
      hideModal();
    });
  };

  return (
    <>
      <Button
        type={btnType}
        loading={loading}
        onClick={showModal}
        style={{ marginRight: 15 }}
        disabled={disabled}
      >
        Отменить
      </Button>
      <WrappedModalCancelOrderForm
        wrappedComponentRef={formRef}
        visible={isModalVisible}
        onCancel={hideModal}
        onOk={handleSubmit}
      />
    </>
  )
};

export default CancelOrderButton;
