import * as React from 'react'

import { SearchForm } from '@/components/search-form'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'
import { VersionSwitcher } from '@/components/version-switcher'
import Link from 'next/link'

// This is sample data.
const data = {
	versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
	navMain: [
		{
			title: 'Mails',
			url: '/mails',
			items: [
				{
					title: 'Inbox',
					url: '/inbox',
				},
				{
					title: 'Project Structure',
					url: '/',
				},
			],
		},
		{
			title: 'Labels',
			url: '/labels',
			items: [
				{
					title: 'System Labels',
					url: '/labels/system',
				},
				{
					title: 'User Labels',
					url: '/labels/user',
				},
			],
		},
		{
			title: 'Building Your Application',
			url: '#',
			items: [
				{
					title: 'Routing',
					url: '#',
				},
				{
					title: 'Data Fetching',
					url: '#',
					isActive: true,
				},
				{
					title: 'Rendering',
					url: '#',
				},
				{
					title: 'Caching',
					url: '#',
				},
				{
					title: 'Styling',
					url: '#',
				},
				{
					title: 'Optimizing',
					url: '#',
				},
				{
					title: 'Configuring',
					url: '#',
				},
				{
					title: 'Testing',
					url: '#',
				},
				{
					title: 'Authentication',
					url: '#',
				},
				{
					title: 'Deploying',
					url: '#',
				},
				{
					title: 'Upgrading',
					url: '#',
				},
				{
					title: 'Examples',
					url: '#',
				},
			],
		},
		{
			title: 'API Reference',
			url: '#',
			items: [
				{
					title: 'Components',
					url: '#',
				},
				{
					title: 'File Conventions',
					url: '#',
				},
				{
					title: 'Functions',
					url: '#',
				},
				{
					title: 'next.config.js Options',
					url: '#',
				},
				{
					title: 'CLI',
					url: '#',
				},
				{
					title: 'Edge Runtime',
					url: '#',
				},
			],
		},
		{
			title: 'Architecture',
			url: '#',
			items: [
				{
					title: 'Accessibility',
					url: '#',
				},
				{
					title: 'Fast Refresh',
					url: '#',
				},
				{
					title: 'Next.js Compiler',
					url: '#',
				},
				{
					title: 'Supported Browsers',
					url: '#',
				},
				{
					title: 'Turbopack',
					url: '#',
				},
			],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<VersionSwitcher
					versions={data.versions}
					defaultVersion={data.versions[0]}
				/>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={item.isActive}
										>
											<Link href={item.url}>
												{item.title}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
