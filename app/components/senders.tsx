'use client'

import { getInboxSenders } from '@/app/fetchers/messages'
import { useCallback, useEffect, useState } from 'react'

const InboxSenders = () => {
	const [senders, setSenders] = useState<string[]>([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const fetchSenders = useCallback(async () => {
		setLoading(true)
		try {
			const result = await getInboxSenders()
			setSenders(result)
			setLoading(false)
		} catch (err: any) {
			console.log('error occured ...', err)
			setError(err.message)
		}
	}, [])

	useEffect(() => {
		fetchSenders()
	}, [fetchSenders])

	if (error) return <div>Error: {error}</div>

	return (
		<div>
			<h1>Inbox Senders</h1>

			<button onClick={fetchSenders}>refetch</button>
			{loading ? <div>Loading...</div> : null}
			<ul>
				{senders.map((sender, index) => (
					<li key={index}>{sender}</li>
				))}
			</ul>
		</div>
	)
}

export default InboxSenders
