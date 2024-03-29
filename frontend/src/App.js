import Home from './pages/home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import LoginWithCode from './pages/auth/LoginWithCode';
import Verify from './pages/auth/Verify';
import Profile from './pages/profile/Profile';
import ChangePassword from './pages/changePassword/ChangePassword';
import UserList from './pages/userList/UserList';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStatus, getUser, selectIsLoggedIn, selectUser } from './redux/features/auth/authSlice';
import { GoogleOAuthProvider } from '@react-oauth/google';

axios.defaults.withCredentials = true; // to send the token or credentials with every http request

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  
  useEffect(() => {
   dispatch(loginStatus());
   if(isLoggedIn && user === null){
    dispatch(getUser());
   }
  }, [dispatch, isLoggedIn, user])
  // const GoogleOAuthProviderComponent = process.env.REACT_APP_GOOGLE_CLIENT_ID
  //   console.log('Google Client ID:', GoogleOAuthProviderComponent );
  
  return (
    <>
     <Router>
      <ToastContainer/>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
     <Routes>
      <Route path="/" element={<Layout> <Home/> </Layout>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
      <Route path="/resetPassword/:resetToken" element={<Reset/>}/>
      <Route path="/loginWithCode/:email" element={<LoginWithCode/>}/>
      <Route path="/verify/:verificationToken" element={<Layout><Verify/></Layout>}/>
      <Route path="/profile" element={<Layout><Profile/></Layout>}/>
      <Route path="/changePassword" element={<Layout><ChangePassword/></Layout>}/>
      <Route path="/users" element={<Layout><UserList/></Layout>}/>
     </Routes>
     </GoogleOAuthProvider>
     </Router> 
    </>
  );
}

export default App;
