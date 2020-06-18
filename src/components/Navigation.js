import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { title } from '../utils'
import * as actions from '../actions';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Navigation = () => {
  const menu = useSelector((state) => state.menu);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const availablePages = auth.payload.permissions;

  const menuItemsMap = {
    Кухни: (
      <Menu.Item key="2">
        <Icon type="shop" />
        <span>Кухни</span>
        <Link to="/kitchens/" />
      </Menu.Item>
    ),
    Продукты: (
      <SubMenu
        key="sub1"
        title={(
          <span>
            <Icon type="shopping" />
            <span>Продукты</span>
          </span>
        )}
      >
        <Menu.Item key="3">
          Категории
          <Link to="/products/categories/" />
        </Menu.Item>
        <Menu.Item key="4">
          Продукты
          <Link to="/products/" />
        </Menu.Item>
        <Menu.Item key="5">
          Модификаторы
          <Link to="/products/modifiers" />
        </Menu.Item>
      </SubMenu>
    ),
    Клиенты: (
      <Menu.Item key="6">
        <Icon type="smile" />
        <span>Клиенты</span>
        <Link to="/clients/" />
      </Menu.Item>
    ),
    Курьеры: (
      <Menu.Item key="7">
        <Icon type="car" />
        <span>Курьеры</span>
        <Link to="/riders/" />
      </Menu.Item>
    ),
    Объявления: (
      <Menu.Item key="8">
        <Icon type="sound" />
        <span>Объявления</span>
        <Link to="/announcements/" />
      </Menu.Item>
    ),
    Заказы: (
      <SubMenu
        key="sub2"
        title={(
          <span>
            <Icon type="shopping-cart" />
            <span>Заказы</span>
          </span>
        )}
      >
        <Menu.Item key="9">
          Активные
          <Link to="/orders/active/" />
        </Menu.Item>
        <Menu.Item key="10">
          Завершенные
          <Link to="/orders/finished/" />
        </Menu.Item>
      </SubMenu>
    ),
    Администраторы: (
      <Menu.Item key="11">
        <Icon type="user" />
        <span>Администраторы</span>
        <Link to="/admins/" />
      </Menu.Item>
    ),
    Настройки: (
      <Menu.Item key="12">
        <Icon type="setting" />
        <span>Настройки</span>
        <Link to="/params/" />
      </Menu.Item>
    ),

  };

  return (
    <Sider trigger={null} collapsible collapsed={false} style={{ minHeight: 'auto' }}>
      <div className="logo">
        <h1>{title || 'YAM'}</h1>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[`${menu.activeMenu}`]}>
        <Menu.Item key="1">
          <Icon type="home" />
          <span>Главная</span>
          <Link to="/" />
        </Menu.Item>

        {availablePages.map((page) => menuItemsMap[page])}
      </Menu>
      {availablePages.length &&
      <div className="ant-layout-sider-trigger"
           style={{width: '200px'}}
           onClick={() => dispatch(actions.logout())}>
        <Icon type="logout"/>
        <span> Выход</span>
      </div>}
    </Sider>
  )
};

export default Navigation;
