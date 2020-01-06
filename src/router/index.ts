import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld.vue'
import js from "@/views/jsText.vue";
// import css from '@/views/cssText.vue'
// import components from '@/views/componentText.vue'
// import vueText from '@/views/vueText.vue'
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/css",
      component: () => import("@/views/index.vue"),
      children: [
        {
          path: "css",
          name: "css",
          component: () => import("@/views/cssText.vue"),
          meta: { title: "css" }
        },
        {
          path: "component",
          name: "component",
          component: () => import("@/views/componentText.vue"),
          meta: { title: "component" },
          children: [
            {
              path: "bigFileUpload",
              name: "bigFileUpload",
              meta: { title: "bigFileUpload" },
              component: () =>
                import("@/components/bigFileUpload/bigFileUpload.vue")
            },
            {
              path:'alert',
              name:'alert',
              meta:{title:'alert'},
              component:()=>import('@/components/alert/index.vue')
            },
            {
              path:'Paging',
              name:'Paging',
              meta:{title:'Paging'},
              component:()=>import('@/components/Paging.vue')
            },
            {
              path:'tree',
              name:'tree',
              meta:{title:'tree'},
              component:()=>import('@/components/tree/treeIndex.vue')
            },
            {
              path:'validatorForm',
              name:'validatorForm',
              meta:{title:'validatorForm'},
              component:()=>import('@/components/validatorForm/index.vue')
            }
          ]
        },
        {
          path: "js",
          name: "js",
          component: () => import("@/views/jsText.vue"),
          meta: { title: "js" }
        }
      ]
    },
    {
      path: "/vue",
      name: "vue",
      redirect: "/vue/shoping",
      component: () => import("@/views/index.vue"),
      children: [
        {
          path: "vue2",
          name: "vue2",
          component: () => import("@/views/cssText.vue"),
          meta: { title: "vue1" }
        },
        {
          path: "shoping",
          name: "商城",
          component: () => import("@/components/breadcrumb/shoping.vue"),
          meta: ["商城"],
          children: [
            {
              path: "v1",
              name: "服装店",
              component: () => import("@/components/breadcrumb/vue1.vue"),
              meta: ["商城", "服装店"]
            },
            {
              path: "v2",
              name: "鞋子店",
              component: () => import("@/components/breadcrumb/vue2.vue"),
              meta: ["商城", "鞋子店"]
            },
            {
              path: "v3",
              name: "配饰店",
              component: () => import("@/components/breadcrumb/vue3.vue"),
              meta: ["商城", "配饰店"]
            }
          ]
        },
        {
          path: "vue3",
          name: "vue3",
          component: () => import("@/views/cssText.vue"),
          meta: { title: "vue1" }
        }
      ]
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/404.vue")
    }
  ]
});
