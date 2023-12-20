export const menuConfig = [
	{ link: '/', label: 'Новости' },
	{ link: '/posts', label: 'Объявления' },
]

export const privateMenuConfig = [
	...menuConfig,
	{ link: '/favorite', label: 'Избранные' },
]
