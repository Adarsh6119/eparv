import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '')

  if (!url) {
    url = process.env.NODE_ENV === 'production' ? 'https://eparvmotors.com' : 'http://localhost:3000'
  }

  // Guarantee protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }

  // Guarantee no trailing slash
  return url.replace(/\/+$/, '')
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return getServerSideURL()
}

