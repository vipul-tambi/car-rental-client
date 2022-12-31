import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsAction.js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner'
import { Row, Col, Divider, DatePicker, Checkbox } from "antd";
import moment from 'moment';

import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import 'aos/dist/aos.css';
const { RangePicker } = DatePicker;

function BookingCar({ match }) {
    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [car, setcar] = useState({});
    const dispatch = useDispatch();
    const { carid } = useParams()

    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalHours, setTotalHours] = useState(0);

    const [driver, setdriver] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {


        if (cars.length === 0) {
            dispatch(getAllCars());
        }
        else {
            setcar(cars.find(o => o._id === carid));
        }
    }, [cars]);

    useEffect(() => {
        setTotalAmount((totalHours * car.rentPerHour) + (driver && (totalHours * 30)))
    }, [driver, totalHours])

    function selectTimeSlots(values) {
        //  console.log(moment(values[0]).format('MM DD y HH:mm'));
        setFrom(moment(values[0]).format('MM/DD/YYYY HH:mm'));
        setTo(moment(values[1]).format('MM/DD/YYYY HH:mm'));

        setTotalHours(values[1].diff(values[0], 'hours'));
    }

    function bookNow() {

    }

    function onToken(token) {
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem('user'))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequire: driver,
            bookedTimeSlots: {
                from,
                to
            }
        }

        dispatch(bookCar(reqObj));
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify="center" className="d-flex align-items-center" style={{ minheight: '90vh' }}>
                <Col lg={10} sm={24} xs={24} className="p-3">
                    <img src={car.image} className="carimg2 bs1 w-100" data-aos="zoom-in-right" data-aos-duration="2000" />
                </Col>

                <Col lg={10} sm={24} xs={24} className="text-right">
                    <Divider style={{ color: "#1f1f1f" }} dashed>Car Info</Divider>
                    <div style={{ textAlign: "right" }} className="text-right">
                        <p style={{ fontWeight: "bold", color: "#308D46", textAlign: "right" }}>{car.name}</p>
                        <p style={{ color: "#1f1f1f", textAlign: "right" }}>Rent Per Hour <span>&#8377;</span>{car.rentPerHour}</p>
                        <p style={{ color: "#1f1f1f", textAlign: "right" }}>Fule Type: {car.fuelType}</p>
                        <p style={{ color: "#1f1f1f", textAlign: "right" }}>Max Persons: {car.capacity}</p>
                    </div>
                    <Divider dashed>Select Time Slots</Divider>
                    <div style={{ textAlign: "right" }} >
                        <RangePicker style={{ borderColor: '#308D46' }} showTime={{ format: "HH:mm" }} format='MM-DD-YYYY HH:mm' onChange={selectTimeSlots} />
                        <br />

                    </div>
                    {from && to && (
                        <div style={{ textAlign: "right" }} >

                            <p style={{ color: "#1f1f1f", textAlign: "right" }}>Total Hours : <b>{totalHours}</b></p>
                            <p style={{ color: "#1f1f1f", textAlign: "right" }}>Rent Per Hour :<b>{car.rentPerHour}</b></p>
                            <Checkbox onChange={(e) => {
                                if (e.target.checked) {
                                    setdriver(true);
                                }
                                else {
                                    setdriver(false);
                                }
                            }} style={{ color: "#1f1f1f", textAlign: "right" }}>Driver Required</Checkbox>
                            <h3 style={{ color: "#1f1f1f", textAlign: "right" }}>Total Amount : {totalAmount}</h3>

                            <StripeCheckout
                                shippingAddress
                                currency='INR'
                                token={onToken}
                                amount={totalAmount * 100}
                                stripeKey="pk_test_51LqZTkSAzMUm1mNGRn2K2ykHOONPDAu9vuXFle8VNvmiAd0Lk0uZZOUcY8Ch5rNtw5wpcT1ZbrmVNdLefYqdS4cX00PytVS53n"    >
                                <button className="btn1" >Book Now</button>
                            </StripeCheckout>


                        </div>)}

                </Col>



            </Row>





        </DefaultLayout>);
}

export default BookingCar;


