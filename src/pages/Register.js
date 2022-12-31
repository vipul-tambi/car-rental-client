import React from 'react';
import { Col, Input, Row, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';
import store from '../redux/store';


const Register = () => {
    const store1 = store;

    return (
        <Provider store={store1}> // Set context
            <Register1 /> // Now App has access to context
        </Provider>
    )
}


function Register1() {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer);

    function onFinish(values) {
        if (values.password === values.cpassword) {
            dispatch(userRegister(values))
        }
        else {
            message.error('please check your password')
        }
        console.log(values)
    }

    return (
        <div className="login">
            {loading && (<Spinner />)}
            <Row gutter={16} className='d-flex align-items-center'>

                <Col lg={16} style={{ position: 'relative' }}>
                    <img className='w-100' data-aos='slide-right' data-aos-duration='1500' src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" alt='carimg' />
                    {/* <img className='w-100' data-aos='slide-left' data-aos-duration='1500' src="https://images.pexels.com/photos/38570/lamborghini-car-speed-prestige-38570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" /> */}
                    {/* <img className='w-100' data-aos='slide-left' data-aos-duration='1500' src="https://images.pexels.com/photos/261986/pexels-photo-261986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" /> */}

                </Col>
                <Col lg={8} className="text-left p-5" style={{ paddingTop: "100px", paddingRight: "50px" }}>
                    <Form layout='vertical' className="login-form p-5" style={{ margin: "30px", backgroundColor: "#273239" }} onFinish={onFinish}>
                        <h1>Register</h1>
                        <hr />
                        <Form.Item name='username' label="Username" style={{ backgroundColor: "#273239" }} rules={[{ required: true }]} >
                            <Input placeholder='Username' minlength="4" maxlength="8" type='text' />
                        </Form.Item>
                        <Form.Item name='password' label="Password" style={{ backgroundColor: "#273239" }} rules={[{ required: true }]} >
                            <Input placeholder='Password' type='password' />
                        </Form.Item>
                        <Form.Item name='cpassword' label="Confirm Password" style={{ backgroundColor: "#273239" }} rules={[{ required: true }]} >
                            <Input placeholder='Confirm Password' type='password' />
                        </Form.Item>

                        <button data-testid='reg' className='btn1 mt-2' style={{ backgroundColor: "#308D46" }}>Register</button>
                        <hr />

                        <Link to='/login'>Click here to Login</Link>

                    </Form>
                </Col>

            </Row>
        </div>

    )
}

export default Register
