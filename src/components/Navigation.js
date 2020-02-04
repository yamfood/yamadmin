import React from "react";
import {Link} from "react-router-dom";
import {Layout, Menu, Icon} from 'antd';

const {Sider} = Layout;
const {SubMenu} = Menu;


const Navigation = () => {
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo">
                <h1>Yam</h1>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Icon type="home"/>
                    <span>Главная</span>
                    <Link to="/"/>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="shop"/>
                    <span>Продукты</span>
                    <Link to="/products"/>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="user"/>
                    <span>Пользователи</span>
                    <Link to="/users"/>
                </Menu.Item>
                <SubMenu key="sub1"
                         title={
                             <span>
                                <Icon type="shopping-cart"/>
                                <span>Заказы</span>
                             </span>
                         }
                >
                    <Menu.Item key="5">
                        Активные
                        <Link to="/orders/active"/>
                    </Menu.Item>
                    <Menu.Item key="6">
                        Завершенные
                        <Link to="/orders/finished"/>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        // <div className="navigation">
        //     <Link to="/"><i className='bx bx-home'/> Домой </Link>
        //     <Link to="/orders"><i className='bx bx-basket'/> Заказы</Link>
        //     <Link to="/products"><i className='bx bx-food-menu'/> Продукты</Link>
        // </div>

    )
};


export default Navigation;