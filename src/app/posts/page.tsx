import { postsService } from '@/shared/api'
import { PostsFeedWidget } from '@/widgets'
import React, { Suspense } from 'react'

const PostsPage = async () => {
	const posts = await postsService.getPosts()

	return <PostsFeedWidget data={posts} />
}

export default PostsPage
