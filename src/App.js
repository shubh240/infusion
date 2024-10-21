import React, { useEffect } from 'react';
import { BrowserRouter, useNavigate } from "react-router-dom";
import Spinner from './component/Spinner';
import { useSelector } from 'react-redux';
import AllRoutes from './routes/Routes';
import 'remixicon/fonts/remixicon.css';
import Cookies from 'js-cookie';

const App = () => {
  const { isLoading } = useSelector((state) => state.master);
  const isLoggedIn = Cookies.get('token');
  
  return (
    <>
      {isLoading && <Spinner />}
      <BrowserRouter>
        <AuthRedirect isLoggedIn={isLoggedIn} />
        <AllRoutes />
      </BrowserRouter>
    </>
  );
};

const AuthRedirect = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); 
    }
  }, [isLoggedIn]);

  return null;
};

export default App;
