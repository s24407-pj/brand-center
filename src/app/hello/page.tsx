import {getUsers} from '@db/db'

export default async function Page() {
	const users = await getUsers()
	return (
		<div className="bg-slate-300 text-black">
			{users.map((user) => (
				<div key={user.id}>
					{user.name} {user.email} {user.role}
				</div>
			))}
		</div>
	)
}
