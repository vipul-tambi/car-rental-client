import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import Protect from './pages/Protect';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Protect> <Home /></Protect>} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/booking/:carid' element={<Protect> <BookingCar /> </Protect>} />
          <Route exact path='/userbookings' element={<Protect> <UserBookings /> </Protect>} />
          <Route exact path='/addcar' element={<Protect> <AddCar /> </Protect>} />
          <Route exact path='/editcar/:carid' element={<Protect> <EditCar /> </Protect>} />
          <Route exact path='/admin' element={<Protect> <AdminHome /> </Protect>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


export function ProtectedRoute(props) {
  if (localStorage.getItem('user')) {
    return (
      <Router>
        <Routes>
          <Route {...props} />
        </Routes>
      </Router>
    )
  }
  else {
    return (

      <Router>
        <Routes>
          <Navigate to="/login" replace={true} />
        </Routes>
      </Router>
    );


  }
}