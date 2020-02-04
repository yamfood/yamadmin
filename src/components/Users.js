import React from "react";
import {Layout, Table} from "antd";
import {withRouter} from 'react-router-dom'

const {Content} = Layout;


const Users = ({history}) => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            render: text => `${text.toLocaleString('ru')} сум`
        },
        {
            title: 'Калорийность',
            dataIndex: 'energy',
            key: 'energy',
            render: text => `${text} кКал`
        },
    ];

    const products = [
        {id: 1, name: "Куриный суп с лапшой и яйцом", price: 10000, energy: 500},
        {id: 2, name: "Борщ с рубленой говядиной", price: 10000, energy: 500},
        {id: 3, name: "Шпинатный крем-суп", price: 10000, energy: 500},
        {id: 4, name: "Крабовый салат без риса", price: 10000, energy: 500},
        {id: 5, name: "Помидоры черри и моцарелла", price: 10000, energy: 500},
        {id: 6, name: "Куриный суп с лапшой и яйцом", price: 10000, energy: 500},
        {id: 7, name: "Борщ с рубленой говядиной", price: 10000, energy: 500},
        {id: 8, name: "Шпинатный крем-суп", price: 10000, energy: 500},
        {id: 3, name: "Шпинатный крем-суп", price: 10000, energy: 500},
        {id: 4, name: "Крабовый салат без риса", price: 10000, energy: 500},
        {id: 5, name: "Помидоры черри и моцарелла", price: 10000, energy: 500},
        {id: 6, name: "Куриный суп с лапшой и яйцом", price: 10000, energy: 500},
        {id: 7, name: "Борщ с рубленой говядиной", price: 10000, energy: 500},
        {id: 8, name: "Шпинатный крем-суп", price: 10000, energy: 500},
    ];

    return (
        <Layout>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                }}
            >
                <h1 style={{fontSize: 30, textAlign: "center"}}>Пользователи</h1>
                <Table onRow={(r) => ({
                    onClick: () => history.push(`/products/${r.id}`)
                })} columns={columns} dataSource={products}/>
            </Content>
        </Layout>
    )
};


export default withRouter(Users);