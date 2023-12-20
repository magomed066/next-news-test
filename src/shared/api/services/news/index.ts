import axios, { AxiosError, AxiosResponse } from 'axios'
import { News, NewsRequestResponse } from './types'
import { ErrorResponse } from '@/shared/lib'
import { apiService } from '../../base'

class NewsService {
	async getNews() {
		const res = await fetch('https://api.65info.ru/api/news')

		const news: NewsRequestResponse = await res.json()

		return news.data
	}

	async addToFavorite(id: number): Promise<News> {
		try {
			const data = await apiService.post<News>(
				'https://api.65info.ru/api/news/favorite',
				{
					news_id: id,
				},
			)

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

	async checkIsNewsFavorite(id: number) {
		try {
			await apiService.get(`https://api.65info.ru/api/news/${id}/favorite`)
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

export const newsService = new NewsService()
