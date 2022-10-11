import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { isValidToken, setSession } from '../utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/authentication';
import FirebaseService from 'api/firebase';
import { REACT_APP_API_URL } from 'config';
import axios from 'axios';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER'
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const userId = window.localStorage.getItem('userId');
        if (accessToken && userId && isValidToken(accessToken)) {
          const response = await axios.get(REACT_APP_API_URL + `users/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          const {
            id,
            email,
            image,
            phoneNum,
            idCard,
            city,
            district,
            address,
            firstName,
            lastName,
            bankName
          } = response.data;
          const user = {
            id: id,
            phoneNum: phoneNum,
            idCard: idCard,
            city: city,
            district: district,
            address: address,
            bankName: bankName,
            fullName: `${firstName} ${lastName}`,
            email: email,
            image: image
          };
          setSession(accessToken);

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async () => {
    const firebaseLogin = await FirebaseService.loginWithGoogle();
    const firebaseUser = await firebaseLogin.user?.getIdTokenResult();
    if (!firebaseUser) return;
    const firebaseToken = firebaseUser.token;
    console.log(firebaseToken);
    const response = await axios.post(
      REACT_APP_API_URL + `authenticate/admin?token=${firebaseToken}`
    );
    const {
      id,
      token,
      email,
      image,
      phoneNum,
      idCard,
      city,
      district,
      address,
      fullName,
      bankName
    } = response.data;
    const user = {
      id: id,
      phoneNum: phoneNum,
      idCard: idCard,
      city: city,
      district: district,
      address: address,
      bankName: bankName,
      fullName: fullName,
      email: email,
      image: image
    };
    setSession(token);
    window.localStorage.setItem('userId', id);
    dispatch({
      type: Types.Login,
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    window.localStorage.removeItem('firebaseToken');
    dispatch({ type: Types.Logout });
  };

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
