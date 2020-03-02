/* eslint-disable */
import React, {useState} from "react";
import {Form, Input, Layout} from "antd";
import {connect} from "react-redux";
import {login} from "../actions";
import {Redirect} from "react-router-dom";


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};


const actionsCreator = {
    login: login
};


const Login = (props) => {
    const {login, auth} = props;

    const [state, setState] = useState({
        login: '',
        password: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        login(state.login, state.password);
    };

    const redirect = () => {
        if (auth.status === 'success') {
            return (
                <Redirect to="/"/>
            )
        }
    };

    return (
        <Layout>
            {redirect()}
            <Layout.Content style={{margin: '24px 16px', background: '#fff', padding: 50}}>
                <h1>Login</h1>
                <Form layout="inline" onSubmit={onSubmit}>
                    <Form.Item>
                        <Input type="text"
                               value={state.login}
                               onChange={(e) => setState({
                                   ...state,
                                   login: e.target.value
                               })}
                               placeholder="Логин"/>
                    </Form.Item>
                    <Form.Item>
                        <Input type="password"
                               value={state.password}
                               onChange={(e) => setState({
                                   ...state,
                                   password: e.target.value
                               })}
                               placeholder="Пароль"/>
                    </Form.Item>

                    <Form.Item>
                        <Input type="submit"
                               value="Войти"
                               disabled={auth.status === 'request'}/>
                    </Form.Item>
                </Form>
            </Layout.Content>
        </Layout>
    )
};


export default connect(
    mapStateToProps,
    actionsCreator
)(Login);