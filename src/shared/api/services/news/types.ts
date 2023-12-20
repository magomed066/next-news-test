interface NewsImage {
	id: number
	url: string
}

interface NewsTag {
	id: number
	name: string
	icon: string
}

export interface News {
	id: number
	status: string
	published_at: string
	image: NewsImage
	title: string
	annotation: string
	description: string
	text: string
	tags: NewsTag[]
}

export interface NewsRequestResponse {
	count: number
	total: number
	page: number
	data: News[]
	pageCount: number
}
