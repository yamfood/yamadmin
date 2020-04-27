import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Icon,
  List,
  Input,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderStateChanged } from '../actions';
import textInModal from '../assets/style';


const OrderAvailableModal = ({ getProduct }) => {
  const [isVisible, setModalVisible] = useState(false);
  const [addedProducts, addProduct] = useState([]);
  const dispatch = useDispatch();
  const availableList = useSelector((state) => state.orderDetails.availableList);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    setProducts(availableList);
  }, [availableList]);

  const search = (value) => {
    if (!value) {
      setProducts(availableList);
      return null;
    }
    const filteredProducts = products.filter(
      (pro) => pro.name.toLowerCase().includes(value.toLowerCase()),
    );
    setProducts(filteredProducts);
  };


  return (
    <>
      <Button
        type="link"
        onClick={() => setModalVisible(true)}
      >
        <Icon
          type="plus-square"
          theme="twoTone"
          style={{ fontSize: 24 }}
        />
      </Button>
      <Modal
        title="Доступные продукты"
        visible={isVisible}
        onCancel={() => setModalVisible(false)}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText="Ок"
        width="720px"
      >
        <div style={{ height: '60vh', overflow: 'auto' }}>
          <Input type="text" onChange={(e) => search(e.target.value)} placeholder="Название продукта" />
          <List
            itemLayout="horizontal"
            dataSource={products}
            renderItem={(item) => (
              <List.Item key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: 20, marginTop: 5 }}>
                    {item.price}
                     сум
                  </div>
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch(setOrderStateChanged());
                      addProduct([...addedProducts, item.id])
                      getProduct([item]);
                    }}
                    disabled={addedProducts.includes(item.id)}
                  >
                    Добавить
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default OrderAvailableModal;
