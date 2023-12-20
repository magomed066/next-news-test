import { User } from '@/shared/api'
import { ErrorResponse } from '@/shared/lib'

export interface AuthState {
	isLoading: boolean
	isSuccess: boolean
	token: string
	gotCode: boolean
	sentCode: boolean
	isSuccessVerifyCode: boolean
	isSuccessSentVerifyCode: boolean
	user: null | User
	error: null | ErrorResponse
	isAuth: boolean
}
