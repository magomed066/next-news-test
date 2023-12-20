import { News } from '@/shared/api'

export interface Props {
	data: News
	addToBookMar?: (id: number) => void
	isAuth: boolean
}
