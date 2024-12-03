import { auth, signIn, signOut } from '@/auth'

import { Avatar } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Mail } from 'lucide-react'
const Authenticator = async () => {
	const session = await auth()

	console.log('session  is  => ', session)

	const login = async () => {
		'use server'
		await signIn('google')
	}
	const logout = async () => {
		'use server'
		await signOut()
	}
	return (
		<div>
			{session?.accessToken ? (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar className="justify-center flex items-center">
								{/* <AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/> */}
								<Mail />
								{/* <AvatarFallback>CN</AvatarFallback> */}
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<button onClick={logout}>logout</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : (
				<div>
					<button onClick={login}>login</button>
				</div>
			)}
		</div>
	)
}

export default Authenticator
