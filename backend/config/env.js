import dotenv from 'dotenv'
dotenv.config()

const DB_URL = process.env.VERCEL_DB_URL
const TIME_URL = process.env.VERCEL_TIME_URL

export { DB_URL, TIME_URL }