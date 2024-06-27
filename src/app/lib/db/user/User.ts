import {db} from '@db/db'

export type User = {
	id: number
	firstName: string
	lastName: string
	email: string
	password: string
	role: string
	createdAt: Date
}
