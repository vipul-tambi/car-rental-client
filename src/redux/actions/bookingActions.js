import { message } from 'antd';
import axios from 'axios';

export const bookCar = (reqObj) => {
    return async dispatch => {

        dispatch({
            type: 'LOADING',
            payload: true

        })

        try {
            console.log('i am in', reqObj);
            await axios.post('https://car-rental-app-w6w4-api.onrender.com/api/bookings/bookcar', reqObj);
            dispatch({
                type: 'LOADING',
                payload: false
            })
            message.success('Your car booked successfully')

            setTimeout(() => {
                window.location = '/userbookings'
            }, 500);
            // console.log(reqObj);
        }
        catch (error) {
            dispatch({
                type: 'LOADING',
                payload: false
            })
            console.log("error:: ", error);
            message.error('Something went wrong , please try again later')
        }
    }

}


export const getAllBookings = () => {
    return async dispatch => {

        dispatch({
            type: 'LOADING',
            payload: true

        })

        try {
            const response = await axios.get('https://car-rental-app-w6w4-api.onrender.com/api/bookings/getallbookings')
            console.log(response);
            dispatch({
                type: 'GET_ALL_BOOKINGS',
                payload: response.data
            })
            dispatch({
                type: 'LOADING',
                payload: false
            })
        }
        catch (error) {
            console.log(error)
            dispatch({
                type: 'LOADING',
                payload: false
            })
        }
    }

}
