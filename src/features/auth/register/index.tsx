'use client'
import { login, register } from '@/entities'
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

export const AuthFormFeature = () => {
	const router = useRouter()

	const dispatch = useAppDispatch()
	const { isLoading, error, isSuccess, user } = useAppSelector(
		(state) => state.auth,
	)

	const [isSignIn, setIsSignIn] = useState<boolean>(false)

	const form = useForm({
		initialValues: {
			phone: '',
		},

		validate: {
			phone: (value) =>
				/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
					value,
				)
					? null
					: 'Invalid phone',
		},
	})

	const handleSubmit = form.onSubmit((values) => {
		if (isSignIn) {
			dispatch(login(values.phone))

			return
		}

		dispatch(register(values.phone))

		form.reset()
	})

	const handleForm = () => setIsSignIn((prev) => !prev)

	useEffect(() => {
		if (Boolean(user)) {
			router.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Handle Register Err
	useEffect(() => {
		if (error?.message) {
			toast.error(error?.message?.join(','))
		}
	}, [error])

	// Handle redirect
	useEffect(() => {
		if (isSuccess) {
			setIsSignIn(true)

			if (isSignIn) {
				router.push('/auth-code')
			}
		}
	}, [isSuccess, isSignIn, router])

	return (
		<Flex
			justify="center"
			align={'center'}
			style={{ width: '100vw', height: '80vh' }}
		>
			<Card shadow="md" maw={440} w={400} padding="lg">
				<Title order={3}>{isSignIn ? 'Авторизация' : 'Регистрация'}</Title>

				<Space h="md" />

				<form onSubmit={handleSubmit}>
					<TextInput
						withAsterisk
						label="Телефон"
						placeholder="+79990000000"
						{...form.getInputProps('phone')}
					/>

					<Group justify="flex-end" mt="md">
						<Button
							loading={isLoading}
							disabled={isLoading}
							type="submit"
							fullWidth
						>
							{isSignIn ? 'Войти' : 'Зарегистрироваться'}
						</Button>

						<Button onClick={handleForm} variant="white" w={'fit-content'}>
							{isSignIn ? `Нет акаунта?` : 'Уже есть акаунт?'}
						</Button>
					</Group>
				</form>
			</Card>
		</Flex>
	)
}
