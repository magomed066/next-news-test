'use client'

import { Container, Group, Burger, Title, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './index.module.css'
import { menuConfig, parseJSON, privateMenuConfig } from '@/shared/lib'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutFeature } from '@/features'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'

export const Header = () => {
	const user = useAppSelector((state) => state.auth.user)
	const pathname = usePathname()
	const [isAuth, setIsAuth] = useState(false)
	const [opened, { toggle }] = useDisclosure(false)

	useEffect(() => {
		const user = parseJSON(localStorage.getItem('user'))

		if (user) {
			setIsAuth(true)
		}
	}, [])

	useEffect(() => {
		if (!Boolean(user)) {
			setIsAuth(false)
		}
	}, [user])

	const items = (Boolean(isAuth) ? privateMenuConfig : menuConfig).map(
		(link) => (
			<Link
				key={link.label}
				href={link.link}
				className={classes.link}
				data-active={pathname === link.link || undefined}
			>
				{link.label}
			</Link>
		),
	)

	return (
		<header className={classes.header}>
			<Container size="md" className={classes.inner}>
				<Title>BlogSite</Title>
				<Group gap={5} visibleFrom="xs">
					{items}
				</Group>

				{['/auth', '/auth-code', '/verify-code'].includes(pathname) ? null : (
					<Group visibleFrom="sm">
						{isAuth ? (
							<LogoutFeature />
						) : (
							<Link href={'/auth'}>
								<Button variant="default">Войти</Button>
							</Link>
						)}
					</Group>
				)}

				<Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
			</Container>
		</header>
	)
}
