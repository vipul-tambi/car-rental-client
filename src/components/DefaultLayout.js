import React from "react";
import { Button, Dropdown, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function DefaultLayout(props) {
    const d = new Date();
    let year = d.getFullYear();
    const user = JSON.parse(localStorage.getItem('user'))

    const items = [
        {
            key: '1',
            label: (
                <a href='/'>Home</a>
            ),
        },
        {
            key: '2',
            label: (
                <Link to='/userbookings'>Bookings</Link>

            ),
        },
        {
            key: '3',
            label: (
                <Link to='/admin'>Admin</Link>
            ),
        },
        {
            key: '4',
            label: (
                <Link onClick={() => {
                    localStorage.removeItem('user');
                    window.location = '/login'
                }
                } >
                    Logout
                </Link>
            ),
        },
    ]

    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify='left' >
                    <Col lg={20} sm={24} xs={24} >
                        <div className="headershey">
                            <h1 ><b style={{ color: '#308D46' }}><Link to='/' style={{ color: '#308D46' }}>InfinityCars</Link></b></h1>

                            <Dropdown menu={{ items }} placement="bottom" className="shey">
                                <Button>{user.username}</Button>
                            </Dropdown>
                        </div>

                    </Col>
                </Row>
            </div>

            <div className="content">
                {props.children}
            </div>
            <div className="footer ">
                <hr />

                <p>Desinged and Developed By The Infinity Team</p>

                <p><span>&copy;{year}</span></p>

            </div>

        </div>
    )
}
export default DefaultLayout;