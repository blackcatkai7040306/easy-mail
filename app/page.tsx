// import InboxSenders from '@/app/components/senders'
// import SignIn from '@/app/components/sign-in'
// import SignOut from '@/app/components/sign-out'
// import { auth } from '@/auth'

// export default async function Home() {
// 	const session = await auth()
// 	return (
// 		<div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
// 			<div>Hello thakkudu</div>
// 			<SignIn />
// 			<div>
// 				<pre>{JSON.stringify(session, null, 2)}</pre>
// 			</div>

// 			<SignOut />
// 			{/* <MyMessages session={session} /> */}
// 			<InboxSenders />
// 		</div>
// 	)
// }

export default function Page() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
		</div>
	)
}
