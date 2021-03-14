export default function ({ store, redirect, error, route }) {
  if (!isAuthenticated(store.getters.isAuthenticated) && requireAuthentication(route))
    redirect('/')
}

function isAuthenticated(user) {
  return user
}

function requireAuthentication(route) {
  // return !['/', '/about', '/login'].includes(route.path) // || !route.path.startswith('/error_')
  return ['/console', '/add-events'].includes(route.fullPath)
}
