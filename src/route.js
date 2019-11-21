import Vue from 'vue'
import Router from 'vue-router'

import Home from './view/Home'
import NewReview from './view/NewReview'
import ReviewList from './view/ReviewList'
import Login from './view/Login'
import Manager from './view/Manager'
import Detail from './view/Detail'
// import Images from './view/Images'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/NewReview',
            name: 'NewReview',
            component: NewReview
        },
        {
            path: '/ReviewList',
            name: 'ReviewList',
            component:ReviewList

        },
        
         {
            path: '/Login',
            name: 'Login',
            component: Login
        }, {
            path: '/Manager',
            name: 'Manager',
            component: Manager
        },
        {
            path: '/:id',
            // path: '/detail',
            name: 'Detail',
            component: Detail,
            props: true
        }
    ]
})