import { createContext, useContext, useEffect, useReducer } from 'react';
import { login as loginService } from '../services/authServices';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext(null);

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
  }, []);

  const login = async (username, password) => {
    const userData = await loginService(username, password);
    if(userData.success == true){
      const { token, refreshToken, ...userInfo } = userData.data;
        Cookies.set('accessToken',token);
        Cookies.set('refreshToken', refreshToken);
        Cookies.set('user', JSON.stringify(userInfo));
        dispatch({type:'LOGIN', payload: userData});
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

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
