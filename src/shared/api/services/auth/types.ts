interface Session {
	token: string
	user: User
}

export interface User {
	id: number
	role: string
	phone: string
}

export interface AuthRequestResponse {
	session: Session
	user: User
}
