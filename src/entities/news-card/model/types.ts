import { News } from '@/shared/api'
import { ErrorResponse } from '@/shared/lib'

export interface NewsState {
	favorite: News[]
	isLoading: boolean
	isSuccess: boolean
	error: null | ErrorResponse
}
