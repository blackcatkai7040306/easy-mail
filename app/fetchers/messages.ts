import { getAccessToken } from '@/app/fetchers/getAccessToken'

const fetchMessages = async (accessToken: string) => {
	const response = await fetch(
		'https://gmail.googleapis.com/gmail/v1/users/me/messages?q=in:inbox&maxResults=10',
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	)

	const data = await response.json()
	return data.messages || [] // List of messages
}

const fetchMessageDetails = async (accessToken: string, messageId: string) => {
	const response = await fetch(
		`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=metadata`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	)

	const data = await response.json()
	const headers = data.payload.headers as { name: string; value: string }[]

	// Extract 'From' field
	console.log('headers are as follows: ' + headers)
	const fromHeader = headers.find((header) => header.name === 'From')
	return fromHeader?.value || 'Unknown'
}

const getInboxSenders = async () => {
	const accessToken = await getAccessToken()
	if (!accessToken) throw new Error('Access token not available')

	const messages = await fetchMessages(accessToken)

	const senders = await Promise.all(
		messages.map(async (message: Record<string, string>) => {
			const sender = await fetchMessageDetails(accessToken, message.id)
			return sender
		})
	)

	return senders
}

export { fetchMessageDetails, fetchMessages, getInboxSenders }
