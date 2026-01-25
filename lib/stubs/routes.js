module.exports = function () {
    return `/**
 * Module Routes
 * 
 * Defines routes for this module using Vue Router 4
 * Each route lazy loads its component for better performance
 */

const routes = [
  {
    path: '/example',
    name: 'Example',
    component: () => import('../views/ExampleView.vue'),
    meta: {
      title: 'Example Page',
      requiresAuth: false
    }
  },
  {
    path: '/example/:id',
    name: 'ExampleDetail',
    component: () => import('../views/ExampleDetailView.vue'),
    props: true, // Pass route params as props
    meta: {
      title: 'Example Detail',
      requiresAuth: false
    }
  }
]

export default routes
`
}