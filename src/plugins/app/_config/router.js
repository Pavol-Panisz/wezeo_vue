import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	
	// TODO: Check if this is corrent, I dont understand why/how this works
	{
		path: '/',
		redirect: '/shoping-lists'
	},

	{
		path: '',
		name: 'Shopping List - List',
		component: () => import('@/plugins/lib@shopping-list/shopping-lists/shopping-lists.vue')
	},
	{
		path: '/shopping-list/:id',
		name: 'Shopping List - Detail',
		component: () => import('@/plugins/lib@shopping-list/shopping-list-detail/shopping-list-detail.vue')
	},
	{
		path: '/:catchAll(.*)',
		name: 'NotFound',
		component: () => import('@/plugins/app/views/not-found.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router