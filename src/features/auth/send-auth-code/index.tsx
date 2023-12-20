'use client'
import { login, logout, register, sendVerificationCode } from '@/entities'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
	Button,
	Card,
	Flex,
	Group,
	Space,
	TextInput,
	Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const SendAuthCodeFeature = () => {
	const router = useRouter()

	const form = useForm({
		initialValues: {
			code: '',
		},

		validate: {
			code: (value) => (/[0-9]$/.test(value) ? null : 'Invalid code'),
		},
	})

	const dispatch = useAppDispatch()
	const { error, isSuccessSentVerifyCode, isLoading, user, token, sentCode } =
		useAppSelector((state) => state.auth)

	const handleSubmit = form.onSubmit((values) => {
		dispatch(sendVerificationCode({ code: values.code, token }))

		form.reset()
	})

	useEffect(() => {
		if (Boolean(user) && sentCode) {
			router.push('/')
		}
	}, [router, user, sentCode, dispatch])

	// Handle Register Err
	useEffect(() => {
		if (error?.message) {
			toast.error(error?.message.join(','))
		}
	}, [error])

	// Handle redirect
	useEffect(() => {
		if (isSuccessSentVerifyCode) {
			router.push('/')
		}
	}, [isSuccessSentVerifyCode, router])

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

				<form onSubmit={handleSubmit}>
					<TextInput
						withAsterisk
						label="Код"
						placeholder="0000"
						{...form.getInputProps('code')}
					/>
					<Group justify="flex-end" mt="md">
						<Button
							loading={isLoading}
							disabled={isLoading}
							type="submit"
							fullWidth
						>
							Отправить
						</Button>
					</Group>
				</form>
			</Card>
		</Flex>
	)
}
