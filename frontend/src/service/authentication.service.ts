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

    private loginRequest(user: User): Promise<void> {
        return this.client.apiAuthPost({ user: user })
    }

    public async login(user: User) {
        console.log(
            await this.loginRequest(user)
        )
        this.loginRequest(user)
            .then((response: any) => {
                console.log(response)
                return response
            })
            .then((data: any) => {
                console.log(data)
                store.dispatch('AuthStateModule/COMMIT_USER_TOKEN', data)
            })
    }
}
