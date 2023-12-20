'use client'
import { logout } from '@/entities'
import { SendAuthCodeFeature } from '@/features'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef } from 'react'

const VerifyCodePage = () => {
	const router = useRouter()

	const pathname = usePathname()
	const dispatch = useAppDispatch()
	const { isAuth, sentCode, isSuccessSentVerifyCode } = useAppSelector(
		(state) => state.auth,
	)

	const firstRender = useRef(true)

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}

		return () => {
			if (!firstRender && !isAuth && !isSuccessSentVerifyCode) {
				dispatch(logout())
			}
		}
	}, [isSuccessSentVerifyCode, isAuth, firstRender, dispatch, router])

	return <SendAuthCodeFeature />
}

export default VerifyCodePage
