import { promises as fs } from 'fs'
import { Metadata } from 'next'
import Image from 'next/image'
import path from 'path'
import { z } from 'zod'

import { getInboxSenders } from '@/app/fetchers/messages'
import { auth } from '@/auth'
// import { columns } from '@/components/columns'
import { columns } from '@/app/inbox/columns'
import { DataTableToolbar } from '@/app/inbox/data-table-toolbar'
import { DataTable } from '@/components/data-table'
import { UserNav } from '@/components/user-nav'
import { taskSchema } from '@/data/schema'

export const metadata: Metadata = {
	title: 'Tasks',
	description: 'A task and issue tracker build using Tanstack Table.',
}

// Simulate a database read for tasks.
async function getTasks() {
	const data = await fs.readFile(
		path.join(process.cwd(), './data/tasks.json')
	)

	const tasks = JSON.parse(data.toString())

	return z.array(taskSchema).parse(tasks)
}

async function getMails() {
	// const data = await fs.readFile(
	// 	path.join(process.cwd(), './data/tasks.json')
	// )

	try {
		const result = (await getInboxSenders()) ?? []
		console.log('getInboxSenders, this is results....', result)
		return (result as EmailsType[]) || []
	} catch (err: any) {
		console.log('error occured ...', err)
	}
}

export default async function TaskPage() {
	// const tasks = await getTasks()

	const session = await auth()
	// const labels = await fetchLabels(session?.accessToken as string)
	const mails = (await getMails()) || []
	console.log('Mails: ', session, mails)

	return (
		<>
			{/* <MyMessages session={session} /> */}
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
							Here&apos;s a list of your Mails to manage!
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
