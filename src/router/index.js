import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/components/home.vue');
const Login = () => import('@/components/login/login.vue');
const Register = () => import('@/components/login/register.vue');
const ManagementSystem = () => import('@/components/management_system/management_system.vue')
const TouristProject = () => import('@/components/tourist_project/tourist_project.vue')
const RouteInformation = () => import('@/components/route_information/route_information.vue')
const ContractOrder = () => import('@/components/contract_order/contract_order.vue')
const PriceControl = () => import('@/components/price_control/price_control.vue')
const EvaluationManagement = () => import('@/components/evaluation_management/evaluation_management.vue')
const Personal = () => import('@/components/personal/personal.vue')

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'management_system',
          path: 'management_system',
          component: ManagementSystem,
        },
        {
          name: 'tourist_project',
          path: 'tourist_project',
          component: TouristProject,
        },
        {
          name: 'route_information',
          path: 'route_information',
          component: RouteInformation,
        },
        {
          name: 'contract_order',
          path: 'contract_order',
          component: ContractOrder,
        },
        {
          name: 'price_control',
          path: 'price_control',
          component: PriceControl,
        },
        {
          name: 'evaluation_management',
          path: 'evaluation_management',
          component: EvaluationManagement,
        },
        {
          name: 'personal',
          path: 'personal',
          component: Personal,
        }
      ]
    },
    {
      name: 'register',
      path: 'register',
      component: Register,
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
