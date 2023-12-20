import { AxiosError } from 'axios'
import { apiService } from '../../base'
import { AuthRequestResponse } from './types'
import { ErrorResponse } from '@/shared/lib'

class AuthService {
	async authUser(phone: string): Promise<AuthRequestResponse> {
		try {
			const data = await apiService.post('/api/user/register', { phone })

			throw data
		} catch (error) {
			if (error instanceof AxiosError) {
				throw (
					(error.response?.data as ErrorResponse) || {
						message: ['Something went wrong'],
					}
				)
			} else {
				throw { message: ['Unknown error'] }
			}
		}
	}

	async loginUser(phone: string) {
		try {
			const data = await apiService.post<AuthRequestResponse>(
				'/api/user/auth',
				{
					phone,
				},
			)

			if ('token' in data.session) {
				if (typeof window !== 'undefined') {
					localStorage.setItem('accessToken', data.session.token)
					localStorage.setItem('user', JSON.stringify(data.session.user))
				}
			}

			return data
		} catch (error) {
			if (error instanceof AxiosError) {
				throw (
					(error.response?.data as ErrorResponse) || {
						message: ['Something went wrong'],
					}
				)
			} else {
				throw { message: ['Unknown error'] }
			}
		}
	}

	async getVerificationCode(token: string) {
		try {
			await fetch('https://api.65info.ru/api/user/confirm', {
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
		} catch (error) {
			if (error instanceof AxiosError) {
				throw (
					(error.response?.data as ErrorResponse) || {
						message: ['Something went wrong'],
					}
				)
			} else {
				throw { message: ['Unknown error'] }
			}
		}
	}

	async sendVerificationCode(code: string, token: string) {
		try {
			await apiService.post(
				'https://api.65info.ru/api/user/confirm',
				{ code },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				},
			)
		} catch (error) {
			if (error instanceof AxiosError) {
				throw (
					(error.response?.data as ErrorResponse) || {
						message: ['Something went wrong'],
					}
				)
			} else {
				throw { message: ['Unknown error'] }
			}
		}
	}
}

export const authService = new AuthService()
