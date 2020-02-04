import React, {useState} from "react";
import {Form, Input} from "antd";


const ProductForm = (props) => {
    const [product = {}] = useState(props.product);

    return (
        <Form layout={"vertical"}>
            <Form.Item label="Фото: ">
                <img alt={product.name} style={{width: 100}} src={product.photo}/>
            </Form.Item>
            <Form.Item label="URL Фото: ">
                <Input
                    placeholder="URL Фото"
                    value={product.photo}
                />
            </Form.Item>
            <Form.Item label="Название: ">
                <Input
                    placeholder="Название"
                    value={product.name}
                />
            </Form.Item>
            <Form.Item label="Цена: ">
                <Input
                    type={'number'}
                    placeholder="Цена"
                    value={product.price}
                />
            </Form.Item>
            <Form.Item label="Калорийность: ">
                <Input
                    type={'number'}
                    placeholder="Калорийность"
                    value={product.energy}
                />
            </Form.Item>
        </Form>

    )
};


export default ProductForm;