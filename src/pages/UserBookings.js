import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/bookingActions'
import { Row, Col } from 'antd'
import moment from 'moment'
import Spinner from '../components/Spinner'

function UserBookings() {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        dispatch(getAllBookings())
    }, [])
    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <h1 className='text-center mt-2'>My Bookings</h1>
            <Row justify="center" gutter={16}>
                <Col lg={16} sm={24}>


                    {bookings.filter(o => o.user === user._id).map((booking, index) => {
                        return <Row gutter={16} className="bs1 m-3 " key={index} >
                            <Col lg={6} sm={24} style={{ textAlign: "left" }}>
                                <p><b>{booking.car.name}</b></p>
                                <p>Total hours :{booking.car.totalHours}</p>
                                <p>Rent per hour :{booking.car.rentPerHour} /-</p>
                                <p>Total amount :{booking.totalAmount}</p>
                            </Col>

                            <Col lg={12} sm={24} style={{ textAlign: "left" }}>
                                <p> Transaction Id: <b>{booking.transactionId}</b></p>
                                <p>From: {booking.bookedTimeSlots.from}</p>
                                <p>To: {booking.bookedTimeSlots.to}</p>
                                <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                            </Col>

                            <Col lg={6} sm={24} style={{ textAlign: "right" }} >
                                <img style={{ borderRedius: 5 }} alt="carimg" src={booking.car.image} height='140' className="p-2" />
                            </Col>
                        </Row>
                    })}

                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default UserBookings;

