import { News } from '@/shared/api'

export interface Props {
	data: News
	deleteFromBookmarks?: (id: number) => void
}
