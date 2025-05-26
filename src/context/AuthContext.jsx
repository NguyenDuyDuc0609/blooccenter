import { createContext, useContext, useEffect, useReducer } from 'react';
import { login as loginService } from '../services/authServices';

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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
  }, []);

  const login = async (username, password) => {
    const userData = await loginService(username, password);
    if(userData.success == true){
      const { token, refreshToken, ...userInfo } = userData.data;
        localStorage.setItem('accessToken',token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userInfo));
        dispatch({type:'LOGIN', payload: userData});
    }
    return userData;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
