import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Homepage } from './pages/Homepage';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { DashBoard } from './pages/DashBoard';
import { ProtectRoute } from './parts/ProtectRoute';
import { ActivityGoing } from './components/user/ActivityGoing';
import { InforUser } from './components/user/InforUser';
import { Histories } from './components/user/Histories';
import { LoadingProvider } from './context/LoadingContext';
import { ToastProvider } from './context/ToastContext';
import { ChangePassword } from './components/auth/ChangePassword';
function App() {
  return (
    <BrowserRouter>
    <LoadingProvider>
      <ToastProvider>
        <AuthProvider>
      <Header/>
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/dashboard' element={<DashBoard />}>
            <Route index element={<ActivityGoing />} />
            <Route path='activityGoing' element={<ActivityGoing />} />
            <Route path='inforUser' element={<InforUser />} />
            <Route path='histories' element={<Histories />} />
            <Route path='changePassword' element={<ChangePassword />} />
          </Route>
          {/* <Route
            path="/dashboard"
            element={
              <ProtectRoute>
                <DashBoard />
              </ProtectRoute>
            }
          /> */}
        </Routes>
    </AuthProvider>
      </ToastProvider>
    </LoadingProvider>
    </BrowserRouter>
  );
}


export default App;
