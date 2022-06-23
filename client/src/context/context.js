import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const Context = createContext();

export const ContextProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState(null);
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError]  = useState(null)
  const [navselected, setNavselected] = useState("staff");

  const navigate = useNavigate();
  
  
  useEffect(() => {

    function fetchData() {
      console.log("rendering app..")
      const expiryDate = localStorage.getItem('expiryDate') || null;
      const _token = localStorage.getItem('token') || null;
      if (!_token || !expiryDate) {
        return
      }
      console.log("signing in")
      if (new Date(expiryDate) <= new Date()) {

        logoutHandler();
        return;
      }

      const _userInfo =  JSON.parse(localStorage.getItem('userInfo'));
      console.log(_userInfo)
      const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
      setUserInfo(_userInfo)
      setAuth(true)
      navigate("/");
      setToken(_token);
      setAutoLogout(remainingMilliseconds);
    }

    return fetchData();
  }, [isAuth])

//   const signupHandler = (data) => {

//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('email', data.email)
//     formData.append('username', data.username)
//     formData.append('password', data.password)
//     formData.append('image', data.image)
//      setLoading(true)
//     axios.post('https://dasokuch.herokuapp.com/signup', formData)
//       .then((response) => {
        
//         navigate("/login");
//         setLoading(false)
//       }).catch(err => {
//         console.log(err.response.data);
//         setAuthError(err.response.data.message);
//         setLoading(false)
//       })
//   }

  const adminSigninHandler = (data) => {

    setLoading(true)
    axios.post('http://localhost:5000/admin-signin', data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        setLoading(false)
        res = res.data 
        console.log(res.userInfo) 
        
        const _userInfo = {...res.userInfo, type:"admin"} 
        setToken(res.token)
        setUserInfo(_userInfo)
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );


        setAutoLogout(remainingMilliseconds);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userInfo', JSON.stringify(_userInfo));

        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setAuth(true);
        navigate("/");

      }).catch(err => {
        setLoading(false);
        console.log(err.response.data);
        setAuthError(err.response.data.message)
      })
  }

//  const studnetSigninHandler = (data) => {

//     setLoading(true)
//     axios.post('http://localhost:5000/student-signin', data,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       })
//       .then((res) => {
//         setLoading(false)
//         res = res.data 
//         console.log(res) 
//         return
//         const _userInfo = {...res.userInfo, type:"admin"} 
//         setToken(res.token)
//         setUserInfo(_userInfo)
//         const remainingMilliseconds = 60 * 60 * 1000;
//         const expiryDate = new Date(
//           new Date().getTime() + remainingMilliseconds
//         );


//         setAutoLogout(remainingMilliseconds);
//         localStorage.setItem('token', res.token);
//         localStorage.setItem('userInfo', JSON.stringify(_userInfo));

//         localStorage.setItem('expiryDate', expiryDate.toISOString());
//         setAuth(true);
//         navigate("/");

//       }).catch(err => {
//         setLoading(false);
//         console.log(err.response.data);
//         setAuthError(err.response.data.message)
//       })
//   }



  const logoutHandler = () => {
 
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiryDate');
 
    setAuth(false);
  }

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };




  return (
    <Context.Provider
      value={
        {
          isAuth,
          setAuth,
          adminSigninHandler,
          logoutHandler,
          token,
          setToken,
          userInfo,
          loading,
          authError,
          navselected,
          setNavselected
        }

      }
    >
      {children}
    </Context.Provider>
  );
};