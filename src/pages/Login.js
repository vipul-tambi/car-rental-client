import React from 'react';
import { Col, Input, Row, Form } from 'antd';
import { Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import store from '../redux/store';

AOS.init();


const AppWrapper = () => {
    const store1 = store;

    return (
        <Provider store={store1}> // Set context
            <Login /> // Now App has access to context
        </Provider>
    )
}


function Login() {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)


    const onFinish = (values) => {
        dispatch(userLogin(values))
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
                <Col lg={8} className="text-left p-5 " style={{ paddingTop: "100px", paddingRight: "50px" }} >
                    <Form layout='vertical' className="login-form p-5" style={{ margin: "30px", backgroundColor: "#273239" }} onFinish={onFinish} >
                        <h1>Login</h1>
                        <hr />
                        <Form.Item name='username' label="Username" style={{ color: "#273239" }} rules={[{ required: true }]} >
                            <Input placeholder='Username' type='text' minLength="4" maxLength="8" />
                        </Form.Item>
                        <Form.Item name='password' placeholder="password" type='password' label="Password" style={{ color: "#273239" }} rules={[{ required: true }]} >
                            <Input placeholder='Password' type='password' />
                        </Form.Item>

                        <button data-testid="logbut" className='btn1 mt-2' style={{ backgroundColor: "#2F8D46" }}>Login</button>

                        <hr />
                        <Link to='/register' >Click here to Register</Link>


                    </Form>
                </Col>

            </Row>
        </div>

    )
}

export default AppWrapper;
