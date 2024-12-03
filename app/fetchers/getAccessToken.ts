import { getSession } from 'next-auth/react'

export const getAccessToken = async () => {
	const session = await getSession()
	return session?.accessToken
}
