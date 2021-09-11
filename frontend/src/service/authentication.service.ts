import { User } from '../api'
import { Configuration, AuthenticationApi } from '../api'
import { CookieService } from './cookie.service'
import { store } from '../store'
import RoleEnums from '../enums/authroles.enum'

export class AuthenticationService {
    private client: AuthenticationApi
    private readonly config: Configuration
    private readonly cookieService: CookieService
    private store: typeof store
    constructor() {
        this.config = new Configuration({
            basePath: String(import.meta.env.VITE_BASE_URL),
        })
        this.client = new AuthenticationApi(this.config)
        this.store = store
        this.cookieService = new CookieService()
    }

    private loginRequest(user: User): Promise<object> {
        return this.client.apiAuthPost({ user: user })
    }

    private profileRequest(token: string): Promise<void> {
        return this.client.apiAuthGet({
            headers: {
                Authorization: token,
            },
        })
    }

    public async login(user: User) {
        this.loginRequest(user).then((data: any) => {
            store.dispatch('AuthStateModule/COMMIT_USER_TOKEN', data.token)
            store.dispatch('AuthStateModule/COMMIT_LOGGED_IN', true)
            this.cookieService.setCookie('auth-token', data.token)
            this.cookieService.setCookie('auth-logged-in', true)
        })
    }

    public loggedIn(): boolean {
        return (
            store.getters['AuthStateModule/RETURN_IS_LOGGED_IN'] &&
            Boolean(this.cookieService.getCookie('auth-logged-in'))
        )
    }

    public logOut() {
        store.dispatch('AuthStateModule/COMMIT_USER_TOKEN', '')
        store.dispatch('AuthStateModule/COMMIT_LOGGED_IN', false)
        store.dispatch('AuthStateModule/COMMIT_USER', {})
        store.dispatch('AuthStateModule/COMMIT_USER_ROLE', RoleEnums.user)
        this.cookieService.deleteCookie('auth-token')
        this.cookieService.deleteCookie('auth-logged-in')
    }

    public persistentUser() {
        store.dispatch(
            'AuthStateModule/COMMIT_LOGGED_IN',
            Boolean(this.cookieService.getCookie('auth-logged-in'))
        )
        store.dispatch(
            'AuthStateModule/COMMIT_USER_TOKEN',
            String(this.cookieService.getCookie('auth-token'))
        )
    }

    public returnToken() {
        if (!store.getters['AuthStateModule/RETURN_IS_LOGGED_IN']) return
        if (!store.getters['AuthStateModule/RETURN_USER_TOKEN']) return

        return store.getters['AuthStateModule/RETURN_USER_TOKEN']
    }

    public userProfile() {
        this.profileRequest(this.returnToken()).then((data) => {
            store.dispatch('AuthStateModule/COMMIT_USER', data)
        })
    }
}
