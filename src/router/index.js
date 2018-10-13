
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path:'/reuniones',
    	name: 'Meetups',
    	component: Meetups
    },
    {
    	path: '/reunion/nuevo',
    	name: 'CreateMeetup',
    	component: CreateMeetup
    },
    {
    	path: '/reuniones/:id',
    	name: 'Meetup',
        props: true,
    	component: Meetup
    },
    {
    	path: '/perfil',
    	name: 'Profile',
    	component: Profile
    },
    {
    	path: '/registrate',
    	name: 'Signup',
    	component: Signup
    },
    {
    	path: '/registrarse',
    	name: 'Signin',
    	component: Signin
    }
  ],
  mode: 'history'
})
