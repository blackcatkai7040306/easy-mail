'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { extractContentWithinBrackets } from '@/lib/helper'

export const columns: ColumnDef<EmailsType>[] = [
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
	// {`
	// 	accessorKey: 'id',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Id" />
	// 	),
	// 	cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	{
		accessorKey: 'Subject',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Subject" />
		),
		cell: ({ row }) => {
			// const status = statuses.find(
			// 	(status) => status.value === row.getValue('status')
			// )

			// if (!status) {
			// 	return null
			// }

			return (
				<div className="flex w-[500px] items-center">
					{/* {status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)} */}
					<span>{row.getValue('Subject')}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'From',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="From" />
		),
		cell: ({ row }) => {
			// const label = labels.find(
			// 	(label) => label.value === row.original.label
			// )
			let from = extractContentWithinBrackets(row.getValue('From'))
			return (
				<div className="flex space-x-2">
					{/* {label && <Badge variant="outline">{label.label}</Badge>} */}
					<span className="max-w-[500px] truncate font-medium">
						{from}
					</span>
				</div>
			)
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
