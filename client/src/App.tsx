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
import Scraper from './pages/Scraper/Scraper'
import GenerateMessages from './pages/GenerateMessages/GenerateMessages'
import SendMessages from './pages/SendMessages/SendMessages'
import Chatbot from './pages/Chatbot/Chatbot'
import Settings from './pages/Settings/Settings'
import Proxies from './pages/Proxies/Proxies'
import Instagram from './pages/Instagram/Instagram'

// Generic interface for children
interface ChildrenProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: ChildrenProps) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userInfo !== undefined) {
      setIsLoading(false);
    }
  }, [userInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};


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
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data) {
          console.log("User Info", response.data.user);
          setUserInfo(response.data.user);
        } else {
          setUserInfo(null); // Set to null instead of an empty object
        }
      } catch (error) {
        console.error('Error fetching user info', error);
        setUserInfo(null); // Ensure userInfo is null on error
      } finally {
        setLoading(false);
      }
    };
    
    if (!userInfo) {
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/auth" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile-scraper" element={<PrivateRoute><Scraper /></PrivateRoute>} />
          <Route path="/generate-messages" element={<PrivateRoute><GenerateMessages /></PrivateRoute>} />
          <Route path="/send-messages" element={<PrivateRoute><SendMessages /></PrivateRoute>} />
          <Route path="/ai-chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
          <Route path="/add-proxies" element={<PrivateRoute><Proxies /></PrivateRoute>} />
          <Route path="/add-accounts" element={<PrivateRoute><Instagram /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/404" element={<Error />} />
          <Route path='*' element={<Navigate to ="/404" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
