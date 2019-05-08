import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'IPCTable',
      component: (resolve) => require(['../views/IPCTable.vue'], resolve)
    },
    {
      path: '/IPCTableMulCol',
      name: 'IPCTableMulCol',
      component: (resolve) => require(['../views/IPCTableMulCol.vue'], resolve)
    },
    {
      path: '/IPCTable_merge',
      name: 'IPCTable_merge',
      component: (resolve) => require(['../views/IPCTableMerge.vue'], resolve)
    },
    {
      path: '/IPCTableExport',
      name: 'IPCTableExport',
      component: (resolve) => require(['../views/IPCTableExport.vue'], resolve)
    },
    {
      path: '/IPCTableImport',
      name: 'IPCTableImport',
      component: (resolve) => require(['../views/IPCTableImport.vue'], resolve)
    },
    {
      path: '/IPCTableFixedHeight',
      name: 'IPCTableFixedHeight',
      component: (resolve) => require(['../views/IPCTableFixedHeight.vue'], resolve)
    },

    
  ]
})

export default router
