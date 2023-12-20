'use client'

import React, { FC, useEffect } from 'react'
import { Props } from './types'
import { NewsCard, addToFavorite, setDefaultNewsStateFields } from '@/entities'
import { Container, Divider, Grid, Space, Title } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toast } from 'react-toastify'

export const NewsFeedWidget: FC<Props> = ({ data }) => {
	const isAuth = useAppSelector((state) => state.auth.isAuth)
	const { favorite, isSuccess } = useAppSelector((state) => state.news)

	const cycleSet = [4, 8, 8, 4, 4, 8, 8, 4]

	const dispatch = useAppDispatch()

	const handleAddToFav = (id: number) => {
		const isAlreadyAdded = favorite.find((el) => el.id === id)

		if (isAlreadyAdded) {
			toast.warning('Уже в заметках!')
			return
		}

		dispatch(addToFavorite(id))
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success('Добавлено в заметки!')
		}
	}, [isSuccess])

	useEffect(() => {
		return () => {
			dispatch(setDefaultNewsStateFields())
		}
	}, [dispatch])

	return (
		<Container my="md">
			<Title size="h3">Свежие новости</Title>
			<Space h="xs" />
			<Divider />
			<Space h="md" />

			<Grid gutter="md">
				{data.map((el, i) => (
					<Grid.Col
						span={{
							base: 12,
							xs: cycleSet[i % cycleSet.length],
						}}
						key={el.id}
					>
						<NewsCard
							isAuth={Boolean(isAuth)}
							data={el}
							addToBookMar={handleAddToFav}
						/>
					</Grid.Col>
				))}
			</Grid>
		</Container>
	)
}
