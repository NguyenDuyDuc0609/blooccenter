import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/login/login';
import { Signup } from './components/signup/Signup';
import { Homepage } from './pages/Homepage';
import { AuthProvider } from './store/AuthContext';
import { Header } from './components/header/Header';
import { DashBoard } from './pages/DashBoard';
import { ProtectRoute } from './parts/ProtectRoute';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route
            path="/dashboard"
            element={
              <ProtectRoute>
                <DashBoard />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
