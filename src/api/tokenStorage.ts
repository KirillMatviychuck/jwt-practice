export let accessToken: AccessToken = '';
export let refreshToken: RefreshToken = '';

let savedCallback: (auth: boolean) => void;

export function setOnAuthChange(fn: (auth: boolean) => void) {
    savedCallback = fn
}


export function setTokens(access: AccessToken, refresh: RefreshToken) {
    accessToken = access
    refreshToken = refresh
    savedCallback?.(true)
}

export function clearTokens() {
    savedCallback?.(false)
    accessToken = ''
    refreshToken = ''
}


type AccessToken = string;
type RefreshToken = string;

