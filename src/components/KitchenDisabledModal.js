import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Button,
  Icon,
  List,
  Input,
} from 'antd';
import textInModal from '../assets/style';
import * as actions from '../actions';

const DisabledProductList = ({ id }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setVisible] = useState(false);
  const [stopListProducts, addToStopList] = useState([]);
  const [loadingButtonId, setLoadingButton] = useState([]);
  const kitchens = useSelector((state) => state.kitchens);
  const { productsForModal } = kitchens;

  useEffect(() => {
    dispatch(actions.getKitchenProducts(id));
  }, []);

  const search = (e) => {
    if (e) {
      const { value } = e.target;
      return productsForModal.filter(
        (product) => product.name.toLowerCase().includes(value.toLowerCase()),
      );
    }
    return productsForModal;
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="link"
        onClick={() => setVisible(true)}
      >
        <Icon
          type="plus-square"
          theme="twoTone"
          style={{ fontSize: 24 }}
        />
      </Button>
      <Modal
        title="Добавление продукта в стоп лист"
        visible={isModalVisible}
        onCancel={handleCancel}
        cancelText="Ок"
        style={{ width: 720 }}
        okButtonProps={{ style: { display: 'none' } }}
        closable
      >
        <div style={{ height: '60vh', overflow: 'auto' }}>
          <Input type="text" onChange={search} placeholder="Название продукта" />
          <List
            itemLayout="horizontal"
            dataSource={search()}
            renderItem={(item) => (
              <List.Item key={item.name}>
                <div style={{ display: 'flex' }}>
                  <img
                    src={item.thumbnail}
                    style={{
                      width: 100,
                    }}
                    alt="food"
                  />
                  <div style={textInModal}>
                    {item.name}
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(actions.addDisabledProduct(id, item.id));
                    setLoadingButton(item.id);
                    addToStopList([...stopListProducts, item]);
                  }}
                  disabled={
                    stopListProducts.find((product) => product.id === item.id)
                    && kitchens.productsAddStatus === 'success'
                  }
                  loading={
                    kitchens.productsAddStatus === 'request'
                    && item.id === loadingButtonId
                  }
                  style={{ marginRight: 30 }}
                >
                  Добавить
                </Button>
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
}


export default DisabledProductList;
