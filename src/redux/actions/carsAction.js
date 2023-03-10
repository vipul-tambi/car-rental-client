import { message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const getAllCars = ()=>{
    return async dispatch => {
        
        dispatch({
            type: 'LOADING',
            payload: true
            
        })
    
        try {
           // const response = await axios.get('/api/cars/getallcars')
            const response = await axios.get('https://car-rental-app-w6w4-api.onrender.com/api/cars/getallcars')
            console.log(response);
            dispatch({
                type: 'GET_ALL_CARS',
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



export const addCar = (reqObj)=>{

    return async dispatch => {
        
        dispatch({
            type: 'LOADING',
            payload: true
            
        })
    
        try {   
            const user = JSON.parse(localStorage.getItem('user'));
            reqObj.user = user._id;
           
            
            await axios.post('https://car-rental-app-w6w4-api.onrender.com/api/cars/addcar', reqObj)
            
            dispatch({
                type: 'LOADING',
                payload: false
            })
            message.success('New car added successfully');
            setTimeout(() => {
                window.location='/admin';
            }, 500);
        }
        catch (error) {
            console.log(error)
            dispatch({
                type: 'LOADING',
                payload: false
            })
            message.error(error,'Something went wrong');
        }
    }
    
}

export const editCar = (reqObj)=>{

    return async dispatch => {
        
        dispatch({
            type: 'LOADING',
            payload: true
            
        })
    
        try {   
           
            
            await axios.post('https://car-rental-app-w6w4-api.onrender.com/api/cars/editcar', reqObj)
            
            dispatch({
                type: 'LOADING',
                payload: false
            })
            message.success('Car details updated successfully');
            setTimeout(() => {
                window.location='/admin'
            }, 500);
        }
        catch (error) {
            console.log(error)
            dispatch({
                type: 'LOADING',
                payload: false
            })
            message.error(error,'Something went wrong');
        }
    }
    
}

export const deleteCar = (reqObj)=>{

    return async dispatch => {
        
        dispatch({
            type: 'LOADING',
            payload: true
            
        })
    
        try {   
           
            
            await axios.post('https://car-rental-app-w6w4-api.onrender.com/api/cars/deletecar', reqObj)
            
            dispatch({
                type: 'LOADING',
                payload: false
            })
            message.success('Car deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
        catch (error) {
            console.log(error)
            dispatch({
                type: 'LOADING',
                payload: false
            })
            message.error(error,'Something went wrong');
        }
    }
    
}










































// export const getAllCars = async dispatch => {
//     console.log('i am in action');
//     dispatch({
//         type: 'LOADING',
//         payload: true
        
//     })

//     try {
//         const response = await axios.get('/api/cars/getallcars')
//         // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
//         console.log(response);
//         dispatch({
//             type: 'GET_ALL_CARS',
//             payload: response.data
//         })
//         dispatch({
//             type: 'LOADING',
//             payload: false
//         })
//     }
//     catch (error) {
//         console.log(error)
//         dispatch({
//             type: 'LOADING',
//             payload: false
//         })
//     }
// }
