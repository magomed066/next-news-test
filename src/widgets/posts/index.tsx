'use client'

import React, { FC } from 'react'
import { Props } from './types'
import { Alert, Container, Title } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

export const PostsFeedWidget: FC<Props> = ({ data }) => {
	if (data.length === 0) {
		return (
			<Container>
				<Alert
					variant="light"
					color="blue"
					title="Объявления"
					icon={<IconInfoCircle />}
				>
					Объявлений пока что нет!
				</Alert>
			</Container>
		)
	}

	return (
		<Container>
			<Title>Объявления</Title>
		</Container>
	)
}
