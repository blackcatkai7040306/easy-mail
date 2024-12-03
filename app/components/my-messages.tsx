'use client'

import { Session } from 'next-auth'
import { useCallback, useEffect, useState } from 'react'

const MyMessages = ({ session }: { session: Session | null }) => {
	const [messages, setMessages] = useState([])
	const [selectedThredId, setSelectedThredId] = useState<string | null>(null)
	const [messageDetails, setMessageDetails] = useState({})

	const fetchEmails = useCallback(async () => {
		if (!session) {
			console.warn('No active session')
			return 'done nothing'
		}

		const response = await fetch(
			'https://gmail.googleapis.com/gmail/v1/users/me/messages',
			{
				headers: {
					Authorization: `Bearer ${session?.accessToken}`,
				},
			}
		)
		const data = await response.json()
		if (data && data.messages) {
			setMessages(data.messages) // Store the fetched emails in state
		}
		console.log(data) // Inspect the emails
	}, [session?.accessToken])

	const fetchEmailDetails = useCallback(
		async (threadId: string) => {
			if (!session) {
				console.warn('No active session')
				return 'done nothing'
			}
			setSelectedThredId(threadId)
			const response = await fetch(
				`https://gmail.googleapis.com/gmail/v1/users/me/messages/${threadId}?format=metadata`,
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				}
			)
			const data = await response.json()
			setMessageDetails(data) // Store the fetched emails in state

			console.log(data) // Inspect the emails
		},
		[session?.accessToken]
	)

	useEffect(() => {
		fetchEmails()
	}, [])

	return (
		<div>
			<button onClick={fetchEmails}>fetch again</button>
			<button onClick={() => setMessages([])}>reset</button>
			<div>These are going to be the messages....</div>
			{/* Render the fetched emails */}
			{messages.length === 0 && <div>No messages found.</div>}

			{messages.map((message: { id: string; threadId: string }) => {
				return (
					<div key={message?.id}>
						<button onClick={() => fetchEmailDetails(message?.id)}>
							{message?.id}
						</button>
					</div>
				)
			})}
			<button onClick={() => fetchEmailDetails('me')}>
				fetch my details
			</button>
			{/* Render the selected email details */}
			<div>
				<pre>{JSON.stringify(messageDetails, null, 2)}</pre>
			</div>
		</div>
	)
}

export default MyMessages
