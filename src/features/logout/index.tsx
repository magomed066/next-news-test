'use client'

import { logout } from '@/entities'
import { useAppDispatch } from '@/store/hooks'
import { Button } from '@mantine/core'
import React, { useState } from 'react'

export const LogoutFeature = () => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(false)

	const handleClick = () => {
		setLoading(true)

		setTimeout(() => {
			dispatch(logout())

			setLoading(false)
		}, 500)
	}

	return (
		<Button
			onClick={handleClick}
			loading={loading}
			disabled={loading}
			color="red"
		>
			Выйти
		</Button>
	)
}
