import { User } from '../api'
import { Configuration, AuthenticationApi } from '../api'
import { store } from '../store'

export class AuthenticationService {
    private client: AuthenticationApi
    private readonly config: Configuration
    private store: typeof store
    constructor() {
        this.config = new Configuration({
            basePath: String(import.meta.env.VITE_BASE_URL),
        })
        this.client = new AuthenticationApi(this.config)
        this.store = store
    }

    public async login(user: User): Promise<void> {
        await this.client.apiAuthPost({ user: user }).then((res) => {
            console.log(res)
            store.dispatch('AuthStateModule/COMMIT_USER_TOKEN', res)
        })
    }
}
