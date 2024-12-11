import { Metadata } from 'next'
import Image from 'next/image'

import { getInboxSenders } from '@/app/fetchers/messages'
import { columns } from '@/app/inbox/columns'
import { DataTableToolbar } from '@/app/inbox/data-table-toolbar'
import { DataTable } from '@/components/data-table'
import { UserNav } from '@/components/user-nav'

export const metadata: Metadata = {
	title: 'Inbox',
	description: 'An Inbox mangement page.',
}

async function getMails() {
	try {
		const result = (await getInboxSenders()) ?? []
		return (result as EmailsType[]) || []
	} catch (err: any) {
		console.log('error occured ...', err)
	}
}

export default async function TaskPage() {
	const mails = (await getMails()) || []

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
							Here&apos;s a list of your Inbox to manage!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<UserNav />
					</div>
				</div>
				<DataTable
					data={mails}
					columns={columns}
					DataToolbar={DataTableToolbar}
				/>
			</div>
		</>
	)
}
