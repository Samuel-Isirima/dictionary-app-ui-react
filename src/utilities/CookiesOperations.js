const setCookie = (cookieName, cookieTTL_in_hours, value) =>
{
    let expires = new Date()
    expires.setTime(expires.getTime() + (cookieTTL_in_hours * 1000))
    setCookie(cookieName, value, { path: '/',  expires})
}