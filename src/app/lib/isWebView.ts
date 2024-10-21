export const isWebView = (() => {
  if (typeof window === 'undefined') {
    return true
  }

  return /wv|WebView|; wv|iPhone.*(?!.*Safari)|Android.*(wv|Version\/\d+\.\d+ Chrome)/i.test(
    window?.navigator?.userAgent
  )
})()
