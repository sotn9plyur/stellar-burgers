import authReducer, {
  clearError,
  setAuthChecked,
  logout
} from '../../slices/authSlice';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser
} from '../../api/authApi';
import { mockUserData } from '../mockData';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  authChecked: false,
  loading: false,
  error: null
};

describe('authSlice tests', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Ошибка' };
    expect(authReducer(stateWithError, clearError()).error).toBeNull();
  });

  it('should handle setAuthChecked', () => {
    expect(authReducer(initialState, setAuthChecked(true)).authChecked).toBe(
      true
    );
  });

  it('should handle logout reducer', () => {
    const state = {
      ...initialState,
      user: mockUserData,
      accessToken: 'token',
      refreshToken: 'refresh',
      isAuthenticated: true,
      authChecked: false
    };
    const newState = authReducer(state, logout());
    expect(newState.user).toBeNull();
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.authChecked).toBe(true);
  });

  it('registerUser.fulfilled should update state', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: mockUserData,
        accessToken: 'token',
        refreshToken: 'refresh'
      }
    };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(mockUserData);
    expect(state.isAuthenticated).toBe(true);
    expect(state.authChecked).toBe(true);
  });

  -it('loginUser.fulfilled should update state', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: mockUserData,
        accessToken: 'token',
        refreshToken: 'refresh'
      }
    };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(mockUserData);
    expect(state.isAuthenticated).toBe(true);
    expect(state.authChecked).toBe(true);
  });

  it('logoutUser.fulfilled should clear auth data', () => {
    const stateBefore = {
      ...initialState,
      user: mockUserData,
      accessToken: 'token',
      refreshToken: 'refresh',
      isAuthenticated: true
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = authReducer(stateBefore, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.authChecked).toBe(true);
  });

  it('getUser.fulfilled should set user and mark authChecked', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: mockUserData
    };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(mockUserData);
    expect(state.isAuthenticated).toBe(true);
    expect(state.authChecked).toBe(true);
  });

  it('updateUser.fulfilled should update user and keep authChecked=false (по твоему коду)', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { ...mockUserData, name: 'updated' }
    };
    const state = authReducer(initialState, action);
    expect(state.user).toEqual({ ...mockUserData, name: 'updated' });
    expect(state.authChecked).toBe(false);
  });
});
