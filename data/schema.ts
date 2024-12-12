import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	id: z.string(),
	title: z.string(),
	status: z.string(),
	label: z.string(),
	priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const ColorSchema = z.object({
	backgroundColor: z.string(),
	textColor: z.string(),
})

export const LabelSchema = z.object({
	id: z.string(),
	name: z.string(),
	messageListVisibility: z.enum(['show', 'hide']),
	labelListVisibility: z.enum(['labelShow', 'labelHide']),
	type: z.enum(['system', 'user']),
	messagesTotal: z.number(),
	messagesUnread: z.number(),
	threadsTotal: z.number(),
	threadsUnread: z.number(),
	color: ColorSchema,
})

export type Labels = z.infer<typeof LabelSchema>
