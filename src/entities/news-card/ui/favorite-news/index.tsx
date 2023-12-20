import React, { FC } from 'react'
import { Props } from './types'
import { Notification } from '@mantine/core'

export const FavoriteNew: FC<Props> = ({ data, deleteFromBookmarks }) => {
	return (
		<Notification
			title={data.title}
			onClose={() => deleteFromBookmarks?.(data.id)}
		>
			{data.annotation}
		</Notification>
	)
}
