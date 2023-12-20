import React, { FC } from 'react'
import { Props } from './types'
import Image from 'next/image'
import 'moment/locale/ru'
import moment from 'moment'
import {
	ActionIcon,
	Badge,
	Card,
	Group,
	Menu,
	Text,
	Tooltip,
	rem,
} from '@mantine/core'
import styles from './index.module.css'
import { IconDots, IconBookmark } from '@tabler/icons-react'

export const NewsCard: FC<Props> = ({ data, addToBookMar, isAuth = false }) => {
	const publishedAt = moment(data.published_at).format('LL')

	const features = data.tags.map((badge) => (
		<Badge variant="light" key={badge.id}>
			{badge.name}
		</Badge>
	))

	const title =
		data.title.length > 30 ? data.title.slice(0, 30) + '...' : data.title

	const desc =
		data.description.length > 100
			? data.description.slice(0, 100) + '...'
			: data.description
	return (
		<Card withBorder radius="md" p="md" className={styles.card}>
			<Card.Section>
				<Image
					style={{
						objectFit: 'cover',
						borderRadius: '5px',
					}}
					className={styles.image}
					width={450}
					height={180}
					blurDataURL={data.image?.url || '/default.png'}
					src={data.image?.url || '/default.png'}
					alt={data.title}
				/>
			</Card.Section>

			{isAuth ? (
				<Group className={styles.action}>
					<Menu withinPortal position="bottom-end" shadow="sm">
						<Menu.Target>
							<ActionIcon variant="subtle" color="white">
								<IconDots />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item
								leftSection={
									<IconBookmark style={{ width: '20px', height: '20px' }} />
								}
								color="gray"
								onClick={() => addToBookMar?.(data.id)}
							>
								В избранные
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			) : null}

			<Card.Section mt="md" className={styles.section}>
				<Group justify="apart">
					<Tooltip label={data.title}>
						<Text fz="lg" fw={500}>
							{title}
						</Text>
					</Tooltip>
				</Group>
				<Text fz="sm" mt="xs">
					{desc}
				</Text>
			</Card.Section>

			<Group gap={7} mt={5}>
				{features}
			</Group>

			<Group mt="xs">
				<Text fz="sm">Опубликовано: {publishedAt}</Text>
			</Group>
		</Card>
	)
}
