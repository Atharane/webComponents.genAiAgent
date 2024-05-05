import connect from './app/lib/db'

export async function register() {
    await connect()
}