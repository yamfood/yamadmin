import React from 'react';
import {
  Form,
  Layout,
  Input,
  Button,
  DatePicker,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../actions';
import FileUploader from './shared/FileUploader';
import { contentStyle } from '../assets/style';

const { Content } = Layout;

const AnnouncementsCreateFrom = ({
  form,
}) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();
  const announcement = useSelector((state) => state.announcements);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(actions.createAnnouncement(values));
      }
    });
  };

  const onUpload = async (folder, file) => dispatch(actions.getSignedURL(folder, file));

  return (
    <Layout>
      <Content style={contentStyle}>
        <h1 style={{ textAlign: 'center', fontSize: 24 }}>Создание Объявления</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Текст">
            {getFieldDecorator('text', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Фото">
            {getFieldDecorator('image_url', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <FileUploader
                onUpload={onUpload}
                folder="announcements"
                accept=".png,.jpg"
                loading={announcement.signedURLStatus === 'request' || announcement.uploadFileStatus === 'request'}
              />,
            )}
          </Form.Item>
          <Form.Item label="Отправить">
            {getFieldDecorator('send_at', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <DatePicker
                showTime
                placeholder="Выберите дату"
              />,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => history.push('/announcements/')}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={announcement.createStatus === 'request'}
                disabled={announcement.signedURLStatus === 'request' || announcement.uploadFileStatus === 'request'}
              >
                Создать
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

const WrappedForm = Form.create()(AnnouncementsCreateFrom);
export default WrappedForm;
