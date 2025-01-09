import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Error from './pages/Error/Error'
import LoginPage from './pages/Auth/Auth'
import userAppStore from './store/store'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'
import { useEffect, useState } from 'react'

// Generic interface for children
interface ChildrenProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children } : ChildrenProps) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

const AuthRoute = ({ children } : ChildrenProps) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/dashboard"/>: children ;
}


function App() {
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = userAppStore();
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(GET_USER_INFO, {withCredentials: true});
        if(response.status === 200 && response.data){
          console.log("User Info", response.data.user);
          setUserInfo(response.data.user);
        } else {
          setUserInfo({ id: '', email: '' });
        }

      } catch (error) {
        console.error('Error fetching user info', error);
      } finally {
        setLoading(false);
      }
    };
    if(!userInfo){
      fetchUserInfo();
    }
    else{
      setLoading(false);
    }
  }, [userInfo, setUserInfo])
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/auth" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
