import { createContext, useContext, useEffect, useReducer } from 'react';
import { login as loginService } from '../services/authServices';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext(null);
const initialState = {
  user: null,
  isLoading: true
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'STOP_LOADING':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN', payload: parsedUser });
      }
      dispatch({ type: 'STOP_LOADING' });
    } catch (error) {
      console.error('Cookie parse lỗi:', error);
      Cookies.remove('user');
      dispatch({ type: 'STOP_LOADING' });
    }
  }, []);

  const login = async (username, password) => {
    const userData = await loginService(username, password);
    if (userData.success === true) {
      const { token, refreshToken, ...userInfo } = userData.data;
      Cookies.set('accessToken', token);
      Cookies.set('refreshToken', refreshToken);
      Cookies.set('user', JSON.stringify(userInfo));
      dispatch({ type: 'LOGIN', payload: userInfo });
    }
    return userData;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');
    navigate('/login');
  };
  const updateUser = (user) => {
    Cookies.set('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout, isLoading: state.isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
