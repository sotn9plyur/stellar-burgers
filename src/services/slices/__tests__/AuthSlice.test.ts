import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser
} from '../../api/authApi';
import { authSlice } from '../authSlice';
import { mockLoginData, mockUserData, mockUserRegisterData } from './Mock';

jest.mock('@api', () => ({
  getUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  registerUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  loginUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  logoutApi: jest.fn()
}));

jest.mock('@api', () => ({
  updateUserApi: jest.fn()
}));

const initiallState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  authChecked: false,
  loading: false,
  error: null
};

describe('UserSlice test', () => {
  test('getUser.pending', () => {
    const state = authSlice.reducer(initiallState, getUser.pending(''));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('getUser.rejected', () => {
    const error = 'error';
    const state = authSlice.reducer(
      initiallState,
      getUser.rejected(new Error(error), '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.authChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('getUser.fulfilled', () => {
    const state = authSlice.reducer(
      initiallState,
      getUser.fulfilled(mockUserData, '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.authChecked).toBe(true);
    expect(state.user).toEqual(mockUserData);
  });

  test('registerUser.pending', () => {
    const state = authSlice.reducer(
      initiallState,
      registerUser.pending('', mockUserRegisterData)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('registerUser.rejected', () => {
    const error = 'error';
    const state = authSlice.reducer(
      initiallState,
      registerUser.rejected(new Error(error), '', mockUserRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.authChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('registerUser.fulfilled', () => {
    const mockResponse = {
      user: mockUserData,
      accessToken: 'test-token',
      refreshToken: 'test-refresh-token'
    };
    const state = authSlice.reducer(
      initiallState,
      registerUser.fulfilled(mockResponse, '', mockUserRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.authChecked).toBe(true);
    expect(state.user).toEqual(mockUserData);
  });

  test('loginUser.pending', () => {
    const state = authSlice.reducer(
      initiallState,
      loginUser.pending('', mockLoginData)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('loginUser.rejected', () => {
    const error = 'error';
    const state = authSlice.reducer(
      initiallState,
      loginUser.rejected(new Error(error), '', mockLoginData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.authChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('loginUser.fulfilled', () => {
    const mockResponse = {
      user: mockUserData,
      accessToken: 'test-token',
      refreshToken: 'test-refresh-token'
    };
    const state = authSlice.reducer(
      initiallState,
      loginUser.fulfilled(mockResponse, '', mockLoginData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.authChecked).toBe(true);
    expect(state.user).toEqual(mockUserData);
  });

  test('logoutUser.pending', () => {
    const state = authSlice.reducer(initiallState, logoutUser.pending(''));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('logoutUser.rejected', () => {
    const error = 'error';
    const state = authSlice.reducer(
      initiallState,
      logoutUser.rejected(new Error(error), '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('logoutUser.fulfilled', () => {
    const state = authSlice.reducer(
      initiallState,
      logoutUser.fulfilled(undefined, '')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toBeNull();
  });

  test('updateUser.pending', () => {
    const state = authSlice.reducer(
      initiallState,
      updateUser.pending('', mockUserRegisterData)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('updateUser.rejected', () => {
    const error = 'error';
    const state = authSlice.reducer(
      initiallState,
      updateUser.rejected(new Error(error), '', mockUserRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.authChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('updateUser.fulfilled', () => {
    const state = authSlice.reducer(
      initiallState,
      updateUser.fulfilled(mockUserData, '', mockUserRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toEqual(mockUserData);
    expect(state.authChecked).toBe(true);
  });
});
