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
