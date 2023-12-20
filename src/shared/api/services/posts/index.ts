import { PostsRequestResponse } from './types'

class PostsService {
	async getPosts() {
		const res = await fetch('https://api.65info.ru/api/postings')

		const posts: PostsRequestResponse = await res.json()

		return posts.data
	}
}

export const postsService = new PostsService()
