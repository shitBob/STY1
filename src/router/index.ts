import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'App',
      component: () => import('@/App.vue'),
    },
    {
      path: '/exerciseshow/:id',
      name: 'exerciseshow',
      component: () => import('@/views/exerciseshow.vue'),
    },
    {
      path: '/exercise/id/:id/profession/:profession/list_index/:list_index/quesion_index/:quesion_index/quesion_num/:quesion_num',
      name: 'exercise',
      component: () => import('@/views/exercise.vue'),
    },
    {
      path:'/wrong/:id',
      name:'wrong',
      component: () => import('@/views/wrong.vue'),
    },
    {
      path:'/examshow/:id',
      name:'examshow',
      component: () => import('@/views/examshow.vue'),
    },
    {
      path: '/exam/id/:id/profession/:profession/exam_id/:exam_id/quesion_index/:quesion_index/quesion_num/:quesion_num',
      name: 'exam',
      component: () => import('@/views/exam.vue'),
    },
    {
      path:'/login',
      name:'login',
      component: () => import('@/views/login.vue'),
    },
    {
      path:'/exam_result/tolnum/:tolnum/correctNum/:correctNum',
      name:'exam_result',
      component: () => import('@/views/exam_result.vue'),
    }
  ],
})

export default router
