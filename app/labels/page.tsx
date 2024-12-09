import { Metadata } from 'next'
import Image from 'next/image'

import { auth } from '@/auth'
import { DataTable } from '@/components/data-table'
import { UserNav } from '@/components/user-nav'
import { columns } from './columns'

export const metadata: Metadata = {
	title: 'Labels',
	description: 'A labels manager build using Tanstack Table.',
}

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
	return (data.labels as Pick<Label, 'id' | 'name' | 'type'>[]) || [] // List of messages
}

export default async function TaskPage() {
	const session = await auth()
	const labels = await fetchLabels(session?.accessToken as string)

	return (
		<>
			<div className="md:hidden">
				<Image
					src="/examples/tasks-light.png"
					width={1280}
					height={998}
					alt="Playground"
					className="block dark:hidden"
				/>
				<Image
					src="/examples/tasks-dark.png"
					width={1280}
					height={998}
					alt="Playground"
					className="hidden dark:block"
				/>
			</div>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Welcome back!
						</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your Labels from you mailbox
							to manage!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<UserNav />
					</div>
				</div>
				<DataTable data={labels} columns={columns} />
			</div>
		</>
	)
}
