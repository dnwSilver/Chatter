import {Request} from 'express'

export const parseCookiesFromRequest=function(request: Request) {
  return parseCookies(request.headers?.cookie)
}

export const parseCookiesFromResponse=function(response) {
  return parseCookies(response.get('Set-Cookie')[0])
}

const parseCookies=function(cookieString: string) {
  const cookies={}
  cookieString?.split(';').forEach(function(cookie) {
    const parts=cookie.match(/(.*?)=(.*)$/)
    if(parts)
      cookies[parts[1].trim()]=(parts[2]||'').trim()
  })
  return cookies
}
