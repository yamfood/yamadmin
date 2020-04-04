import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Button,
  Icon,
  List,
  Input,
} from 'antd';
import * as actions from '../actions';

const DisabledProductList = ({ id }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [stopListProducts, addToStopList] = useState([]);
  const products = useSelector((state) => state.kitchens);
  const { productsModal } = products;
  const [productsList, setProducts] = useState(productsModal);

  const showModal = () => {
    setProducts(productsModal);
    setVisible(true);
  };

  useEffect(() => {
    dispatch(actions.getKitchenProducts(id));
  }, []);

  const search = ({ target }) => {
    const { value } = target;
    if (!value) {
      setProducts(productsModal);
      return;
    }
    const newProducts = productsModal.filter(
      (product) => product.name.toLowerCase().includes(value.toLowerCase()),
    );
    setProducts(newProducts);
  }


  const handleCanel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="link"
        onClick={showModal}
      >
        <Icon
          type="plus-square"
          theme="twoTone"
          style={{ fontSize: 24 }}
        />
      </Button>
      <Modal
        title="Добавление продукта в стоп лист"
        visible={visible}
        onCancel={handleCanel}
        cancelText="Ок"
        style={{ width: 720 }}
        okButtonProps={{ style: { display: 'none' } }}
        closable
      >
        <div style={{ height: '60vh', overflow: 'auto' }}>
          <Input type="text" onChange={search} placeholder="Название продукта" />
          <List
            itemLayout="horizontal"
            dataSource={productsList}
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
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginRight: 15,
                    marginLeft: 15,
                  }}
                  >
                    {item.name}
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(actions.addDisabledProduct(id, item.id));
                    addToStopList([...stopListProducts, item]);
                  }}
                  disabled={
                    stopListProducts.find((product) => product.id === item.id)
                    && products.productsAddStatus === 'success'
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
