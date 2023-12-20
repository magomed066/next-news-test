'use client'
import { FavoriteNew, deleteFromBookmarks } from '@/entities'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Container, Flex } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

export const FavoriteNewsWidget = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const favNews = useAppSelector((state) => state.news.favorite)
	const user = useAppSelector((state) => state.auth.user)

	const handleDelete = (id: number) => {
		dispatch(deleteFromBookmarks(id))
		toast.success('Успешно удалено!')
	}

	useEffect(() => {
		if (!Boolean(user)) {
			router.push('/')
		}
	}, [router, user])

	return (
		<Container>
			<Flex wrap="wrap" gap={20}>
				{favNews.map((el) => (
					<FavoriteNew
						key={el.id}
						data={el}
						deleteFromBookmarks={handleDelete}
					/>
				))}
			</Flex>
		</Container>
	)
}
