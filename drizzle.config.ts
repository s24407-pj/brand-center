import '@/lib/envConfig'
import {defineConfig} from 'drizzle-kit'

export default defineConfig({
	schema: './src/app/lib/db/schema.ts',
	out: './drizzle/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
	verbose: true,
	strict: true,
})
