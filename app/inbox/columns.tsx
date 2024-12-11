'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { extractContentWithinBrackets } from '@/lib/helper'

export const columns: ColumnDef<EmailsType>[] = [
	{
		accessorKey: 'Subject',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Subject" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-[500px] items-center">
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
			let from = extractContentWithinBrackets(row.getValue('From'))
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{from}
					</span>
				</div>
			)
		},
	},
]
