import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { useSelector } from 'react-redux';
import { title } from '../utils'

const { Sider } = Layout;
const { SubMenu } = Menu;

const Navigation = () => {
  const menu = useSelector((state) => state.menu);
  const auth = useSelector((state) => state.auth);

  const availablePages = auth.status === 'success' ? auth.payload.permissions : [];

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

        {availablePages.includes('Кухни') ? (
          <Menu.Item key="2">
            <Icon type="shop" />
            <span>Кухни</span>
            <Link to="/kitchens/" />
          </Menu.Item>
        ) : null}

        {availablePages.includes('Продукты') ? (
          <Menu.Item key="3">
            <Icon type="shopping" />
            <span>Продукты</span>
            <Link to="/products/" />
          </Menu.Item>
        ) : null}

        {availablePages.includes('Клиенты') ? (
          <Menu.Item key="4">
            <Icon type="smile" />
            <span>Клиенты</span>
            <Link to="/clients/" />
          </Menu.Item>
        ) : null}

        {availablePages.includes('Курьеры') ? (
          <Menu.Item key="5">
            <Icon type="car" />
            <span>Курьеры</span>
            <Link to="/riders/" />
          </Menu.Item>
        ) : null}

        {availablePages.includes('Объявления') ? (
          <Menu.Item key="6">
            <Icon type="sound" />
            <span>Объявления</span>
            <Link to="/announcements/" />
          </Menu.Item>
        ) : null}

        {availablePages.includes('Заказы') ? (
          <SubMenu
            key="sub1"
            title={(
              <span>
                <Icon type="shopping-cart" />
                <span>Заказы</span>
              </span>
            )}
          >
            <Menu.Item key="7">
              Активные
              <Link to="/orders/active/" />
            </Menu.Item>
            <Menu.Item key="8">
              Завершенные
              <Link to="/orders/finished/" />
            </Menu.Item>
          </SubMenu>
        ) : null}

        {availablePages.includes('Администраторы') ? (
          <Menu.Item key="9">
            <Icon type="user" />
            <span>Администраторы</span>
            <Link to="/admins/" />
          </Menu.Item>
        ) : null}

        {availablePages.includes('Настройки') ? (
          <Menu.Item key="10">
            <Icon type="setting" />
            <span>Настройки</span>
            <Link to="/params/" />
          </Menu.Item>
        ) : null}
      </Menu>
    </Sider>
  )
};

export default Navigation;
