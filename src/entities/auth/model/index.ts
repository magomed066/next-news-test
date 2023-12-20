import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthState } from './types'
import { User, authService } from '@/shared/api'
import { ErrorResponse, parseJSON } from '@/shared/lib'

const user =
	typeof window !== 'undefined'
		? parseJSON<User>(localStorage.getItem('user') || '')
		: null

const token =
	typeof window !== 'undefined'
		? parseJSON<User>(localStorage.getItem('accessToken') || '')
		: ''

const initialState: AuthState = {
	user: user as User | null,
	isLoading: false,
	gotCode: false,
	sentCode: false,
	isSuccess: false,
	token: (token as string) || '',
	isSuccessVerifyCode: false,
	isSuccessSentVerifyCode: false,
	error: null,
	isAuth: false,
}

export const register = createAsyncThunk(
	'/auth/register',
	async (phone: string, thunkApi) => {
		try {
			const data = await authService.authUser(phone)

			return data
		} catch (error) {
			throw thunkApi.rejectWithValue(error as ErrorResponse)
		}
	},
)

export const login = createAsyncThunk(
	'/auth/login',
	async (phone: string, thunkApi) => {
		try {
			const data = await authService.loginUser(phone)

			return data
		} catch (error) {
			throw thunkApi.rejectWithValue(error as ErrorResponse)
		}
	},
)

export const getVerificationCode = createAsyncThunk(
	'/auth/verification',
	async (token: string, thunkApi) => {
		try {
			await authService.getVerificationCode(token)
		} catch (error) {
			throw thunkApi.rejectWithValue(error as ErrorResponse)
		}
	},
)

export const sendVerificationCode = createAsyncThunk(
	'/auth/verification/send',
	async (data: { code: string; token: string }, thunkApi) => {
		try {
			await authService.sendVerificationCode(data.code, data.token)
		} catch (error) {
			throw thunkApi.rejectWithValue(error)
		}
	},
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.isLoading = false
			state.error = null
			state.isSuccess = false
			state.isSuccessSentVerifyCode = false
			state.isSuccessVerifyCode = false
			state.user = null
			state.isAuth = false

			if (typeof window !== 'undefined') {
				localStorage.clear()
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// Register
			.addCase(register.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.error = null
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true

				state.user = action.payload.user
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false

				state.error = action.payload as ErrorResponse
			})

			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true
				state.isSuccess = false
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.token = action.payload.session.token
				state.user = action.payload.user
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false

				state.error = action.payload as ErrorResponse
			})

			// Get varification code
			.addCase(getVerificationCode.pending, (state) => {
				state.isLoading = true
				state.isSuccessVerifyCode = false
				state.error = null
				state.gotCode = false
			})
			.addCase(getVerificationCode.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccessVerifyCode = true
				state.gotCode = true
			})
			.addCase(getVerificationCode.rejected, (state, action) => {
				state.isSuccessVerifyCode = false
				state.isLoading = false
				state.gotCode = false
				state.error = action.payload as ErrorResponse
			})

			// Send varification code
			.addCase(sendVerificationCode.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(sendVerificationCode.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccessSentVerifyCode = true
				state.sentCode = true

				state.isAuth = true
			})
			.addCase(sendVerificationCode.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccessSentVerifyCode = false
				state.sentCode = false

				state.error = {
					message: [(action.payload as { message: string }).message],
				} as ErrorResponse
			})
	},
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
