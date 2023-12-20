export interface Post {
	id: number
	status: string
	posting_date: string
	product_condition: string
	availability_status: string
	youtube: string
}

export interface PostsRequestResponse {
	data: Post[]
}
