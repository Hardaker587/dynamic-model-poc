export class CookieService {
    constructor() {}
    public setCookie(key: string, value: any) {
        return (document.cookie = `${key}=${value}; ${new Date().toUTCString()}; path=/`)
    }
    public getCookie(key: string): any {
        const keyEquals = key + '='
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') c = c.substring(1, c.length)
            if (c.indexOf(keyEquals) == 0)
                return c.substring(keyEquals.length, c.length)
        }
        return null
    }
    public deleteCookie(key: string) {
        return this.setCookie(key, '')
    }
}
