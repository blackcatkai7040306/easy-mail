import { getAccessToken } from '@/app/fetchers/getAccessToken'
import { extractValuesAsObject } from '@/lib/helper'

const fetchLabels = async (accessToken: string) => {
	const response = await fetch(
		'https://gmail.googleapis.com/gmail/v1/users/me/labels',
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	)

	const data = await response.json()
	return data.messages || [] // List of messages
}

const fetchMessages = async (accessToken: string) => {
	const response = await fetch(
		'https://gmail.googleapis.com/gmail/v1/users/me/messages',
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
	const headers =
		(data.payload.headers as { name: string; value: string }[]) || []

	const fromHeader = extractValuesAsObject(headers, ['From', 'Subject'])
	return fromHeader || {}
}

const getInboxSenders = async () => {
	const accessToken = await getAccessToken()
	if (!accessToken) throw new Error('Access token not available')

	const messages = await fetchMessages(accessToken)

	try {
		const senders = (await Promise.all(
			messages.map(async (message: Record<string, string>) => {
				const sender = (await fetchMessageDetails(
					accessToken,
					message.id
				)) as EmailsType
				return sender
			})
		)) as EmailsType[]

		return senders
	} catch (error) {
		console.error(
			'getInboxSenders, Error occurred fetching senders:',
			error
		)
	}
}

export { fetchLabels, fetchMessageDetails, fetchMessages, getInboxSenders }
