'use client'
import { getVerificationCode } from '@/entities'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button, Card, Flex, Group, Space, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

export const GetAuthCodeFeature = () => {
	const router = useRouter()

	const dispatch = useAppDispatch()
	const { isLoading, error, isSuccessVerifyCode, user, gotCode } =
		useAppSelector((state) => state.auth)

	const handleClick = async () => dispatch(getVerificationCode())

	useEffect(() => {
		if (Boolean(user) && gotCode) {
			router.push('/')
		}
	}, [router, user, gotCode])

	// Handle Register Err
	useEffect(() => {
		if (error?.message) {
			toast.error(error?.message?.join(','))
		}
	}, [error])

	// Handle redirect
	useEffect(() => {
		if (isSuccessVerifyCode) {
			toast.success('Код отправлен Вам на номер!')

			router.push('/verify-code')
		}
	}, [isSuccessVerifyCode, router])

	return (
		<Flex
			justify="center"
			align={'center'}
			style={{ width: '100vw', height: '80vh' }}
		>
			<Card shadow="md" maw={440} w={400} padding="lg">
				<Title order={3} mx={'auto'}>
					Подтверждение аккаунта
				</Title>

				<Space h="md" />

				<div>
					<Group justify="flex-end" mt="md">
						<Button
							loading={isLoading}
							disabled={isLoading}
							onClick={handleClick}
							fullWidth
						>
							Получить код подтверждения
						</Button>
					</Group>
				</div>
			</Card>
		</Flex>
	)
}