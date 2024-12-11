import { auth } from '@/auth'

export const getAccessToken = async () => {
	const session = await auth()
	return session?.accessToken
}
