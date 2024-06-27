import {db} from '@/lib/db/db'
import {users} from '@/lib/db/schema'
import {User} from '@/lib/db/user/User'
import {eq} from 'drizzle-orm'
import {NextResponse} from 'next/server'
import {hash} from 'bcrypt'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const user: User = body
		//check if user exists
		const existingUserByEmail = await db
			.select()
			.from(users)
			.where(eq(users.email, user.email))

		if (existingUserByEmail) {
			return NextResponse.json(
				{user: null, message: 'User already exists'},
				{status: 400},
			)
		}

		const hashedPassword = await hash(user.password, 10)
		user.password = hashedPassword

		const newUser = await db.insert(users).values(user).returning()
		return NextResponse.json(
			{user: newUser, message: 'User created'},
			{status: 201},
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{user: null, message: 'User not created'},
			{status: 500},
		)
	}
}
