import React from 'react';
import {
  Form,
  Button,
  Input,
  Switch,
} from 'antd';
import { useHistory } from 'react-router-dom';


const RidersEditForm = (props) => {
  const history = useHistory();
  const {
    handleSubmit,
    form,
    riders,
  } = props;

  const { getFieldDecorator } = form;


  return (
    <Form
      onSubmit={handleSubmit}
    >
      <Form.Item label="Tid">
        {getFieldDecorator('tid', {
          initialValue: riders.editRiderDetails.tid,
        })(
          <Input type="number" disabled={riders.riderDetailsStatus === 'request'} />,
        )}
      </Form.Item>
      <Form.Item label="Имя">
        {getFieldDecorator('name', {
          initialValue: riders.editRiderDetails.name,
        })(
          <Input disabled={riders.riderDetailsStatus === 'request'} />,
        )}
      </Form.Item>
      <Form.Item label="Сот.Тел">
        {getFieldDecorator('phone', {
          initialValue: riders.editRiderDetails.phone,
        })(
          <Input disabled={riders.riderDetailsStatus === 'request'} type="number" />,
        )}
      </Form.Item>
      <Form.Item label="Заметки">
        {getFieldDecorator('notes', {
          initialValue: riders.editRiderDetails.notes,
        })(
          <Input disabled={riders.riderDetailsStatus === 'request'} />,
        )}
      </Form.Item>
      <Form.Item label="Блокирован">
        {getFieldDecorator('is_blocked', {
          initialValue: riders.editRiderDetails.is_blocked,
          valuePropName: 'checked',
        })(
          <Switch
            disabled={riders.riderDetailsStatus === 'request'}
          />,
        )}
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item>
          <Button onClick={() => history.push('/riders/')}>
                                Назад
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ marginLeft: 10 }}
            type="primary"
            htmlType="submit"
            loading={riders.editRiderStatus === 'request'}
            disabled={riders.riderDetailsStatus === 'request'}
          >
                                Сохранить
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

const WrappedForm = Form.create()(RidersEditForm);
export default WrappedForm;
