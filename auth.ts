import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		accessToken: string
		idToken: string
		user: {
			/** The user's postal address. */
			address: string
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession['user']
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			authorization: {
				params: {
					access_type: 'offline',
					prompt: 'consent',
					response_type: 'code',
					scope: [
						'openid',
						'https://www.googleapis.com/auth/gmail.readonly',
						'https://www.googleapis.com/auth/gmail.labels',
					].join(' '),
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token
				token.idToken = account.id_token || null
			}
			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string
			session.idToken = token.idToken as string
			return session
		},
	},
	secret: process.env.AUTH_SECRET,
	debug: true, // Enable debug mode
})
