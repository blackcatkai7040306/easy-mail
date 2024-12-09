'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table-column-header'
type Label = {
	id: string
	name: string
	messageListVisibility: 'show' | 'hide'
	labelListVisibility: 'labelShow' | 'labelHide'
	type: 'system' | 'user'
	messagesTotal: number
	messagesUnread: number
	threadsTotal: number
	threadsUnread: number
	color: Color
}

type Color = {
	backgroundColor: string
	textColor: string
}
export const columns: ColumnDef<Pick<Label, 'id' | 'name' | 'type'>>[] = [
	// {
	// 	id: 'select',
	// 	header: ({ table }) => (
	// 		<Checkbox
	// 			checked={
	// 				table.getIsAllPageRowsSelected() ||
	// 				(table.getIsSomePageRowsSelected() && 'indeterminate')
	// 			}
	// 			onCheckedChange={(value) =>
	// 				table.toggleAllPageRowsSelected(!!value)
	// 			}
	// 			aria-label="Select all"
	// 			className="translate-y-[2px]"
	// 		/>
	// 	),
	// 	cell: ({ row }) => (
	// 		<Checkbox
	// 			checked={row.getIsSelected()}
	// 			onCheckedChange={(value) => row.toggleSelected(!!value)}
	// 			aria-label="Select row"
	// 			className="translate-y-[2px]"
	// 		/>
	// 	),
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	// {
	// 	accessorKey: 'id',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Id" />
	// 	),
	// 	cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => {
			// const label = labels.find(
			// 	(label) => label.value === row.original.label
			// )

			return (
				<div className="flex space-x-2">
					{/* {label && <Badge variant="outline">{label.label}</Badge>} */}
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue('name')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		cell: ({ row }) => {
			// const status = statuses.find(
			// 	(status) => status.value === row.getValue('status')
			// )

			// if (!status) {
			// 	return null
			// }

			return (
				<div className="flex w-[100px] items-center">
					{/* {status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)} */}
					<span>{row.getValue('type')}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	// {
	// 	accessorKey: 'priority',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Priority" />
	// 	),
	// 	cell: ({ row }) => {
	// 		// const priority = priorities.find(
	// 		// 	(priority) => priority.value === row.getValue('priority')
	// 		// )

	// 		// if (!priority) {
	// 		// 	return null
	// 		// }

	// 		return (
	// 			<div className="flex items-center">
	// 				{priority.icon && (
	// 					<priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
	// 				)}
	// 				<span>{priority.label}</span>
	// 			</div>
	// 		)
	// 	},
	// 	filterFn: (row, id, value) => {
	// 		return value.includes(row.getValue(id))
	// 	},
	// },
	// {
	// 	id: 'actions',
	// 	cell: ({ row }) => <DataTableRowActions row={row} />,
	// },
]
