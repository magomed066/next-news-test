import { newsService } from '@/shared/api'
import { NewsFeedWidget } from '@/widgets'

export default async function Home() {
	const news = await newsService.getNews()

	return <NewsFeedWidget data={news} />
}
