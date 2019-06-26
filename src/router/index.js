import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import home from '@/components/home'
import purchase from "@/components/purchase/purchase";
import myPurchase from "@/components/purchase/myPurchase";
import purchaseList from "../components/purchase/purchaseList";
import sell from "@/components/sell/sell";
import mySell from "@/components/sell/mySell";
import sellList from "@/components/sell/createSell";
import buy from "@/components/order/buy";
import order from "@/components/order/order";
import book from "../components/book";
import search from "../components/search";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/book/:id',
      name: 'book',
      component: book,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/purchase',
      name: '',
      component:purchase,
      children:[
        {
          path: 'my',
          name: 'my',
          component: myPurchase
        },
        {
          path: 'list',
          name: '',
          component: purchaseList
        }
      ],
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/sell',
      name: '',
      component: sell,
      children:[
        {
          path: 'my',
          name: '',
          component: mySell
        },
        {
          path: 'new',
          name: '',
          component: sellList
        }
      ],
      meta: {
        requireAuth: true
      }
    }, {
      path: '/order',
      name: '',
      component: order,
      children:[
        {
          path: 'buy',
          name: '',
          component: buy
        },
        {
          path: 'sell',
          name: '',
          component: sellList
        }
      ],
      meta: {
        requireAuth: true
      }
    }
  ]
})
