import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'welcome', component: () => import('@/views/auth/Welcome.vue') },
  { path: '/connexion', name: 'login', component: () => import('@/views/auth/Login.vue') },
  { path: '/inscription-compte', name: 'register', component: () => import('@/views/auth/Register.vue') },
  { path: '/demo', name: 'persona-switcher', component: () => import('@/views/auth/PersonaSwitcher.vue') },

  {
    path: '/parent',
    component: () => import('@/views/parent/ParentShell.vue'),
    meta: { role: 'parent' },
    children: [
      { path: '', name: 'parent-dashboard', component: () => import('@/views/parent/Dashboard.vue'), meta: { section: 'dashboard' } },
      { path: 'enfants', name: 'parent-children', component: () => import('@/views/parent/Children.vue'), meta: { section: 'children' } },
      { path: 'enfants/:id', name: 'parent-child-detail', component: () => import('@/views/parent/ChildDetail.vue'), props: true, meta: { section: 'children' } },
      { path: 'inscription', name: 'parent-enroll', component: () => import('@/views/parent/EnrollWizard.vue'), meta: { section: 'children' } },
      { path: 'scolarite', name: 'parent-tuition', component: () => import('@/views/parent/Tuition.vue'), meta: { section: 'scolarite' } },
      { path: 'ape', name: 'parent-ape', component: () => import('@/views/parent/ApeHub.vue'), meta: { section: 'ape' } },
      { path: 'ape/projets/:id', name: 'parent-project-detail', component: () => import('@/views/shared/ProjectDetail.vue'), props: true, meta: { section: 'ape' } },
      { path: 'annonces', name: 'parent-announcements', component: () => import('@/views/parent/Announcements.vue'), meta: { section: 'more' } },
      { path: 'profil', name: 'parent-profile', component: () => import('@/views/parent/Profile.vue'), meta: { section: 'more' } },
      { path: 'plus', name: 'parent-more', component: () => import('@/views/parent/More.vue'), meta: { section: 'more' } }
    ]
  },

  {
    path: '/ecole',
    component: () => import('@/views/school/EcoleShell.vue'),
    meta: { role: 'ecole' },
    children: [
      { path: '', name: 'school-dashboard', component: () => import('@/views/school/Dashboard.vue'), meta: { section: 'dashboard' } },
      { path: 'inscriptions', name: 'school-enrollments', component: () => import('@/views/school/Enrollments.vue'), meta: { section: 'enrollments' } },
      { path: 'classes', name: 'school-classes', component: () => import('@/views/school/Classes.vue'), meta: { section: 'classes' } },
      { path: 'ape', name: 'school-ape', component: () => import('@/views/school/ApeHub.vue'), meta: { section: 'ape' } },
      { path: 'ape/projets/:id', name: 'school-project-detail', component: () => import('@/views/shared/ProjectDetail.vue'), props: true, meta: { section: 'ape' } },
      { path: 'annonces', name: 'school-announcements', component: () => import('@/views/school/Announcements.vue'), meta: { section: 'more' } },
      { path: 'profil', name: 'school-profile', component: () => import('@/views/school/Profile.vue'), meta: { section: 'more' } },
      { path: 'plus', name: 'school-more', component: () => import('@/views/school/More.vue'), meta: { section: 'more' } }
    ]
  },

  {
    path: '/ministere',
    component: () => import('@/views/ministry/MinistryShell.vue'),
    meta: { role: 'ministere' },
    children: [
      { path: '', name: 'ministry-dashboard', component: () => import('@/views/ministry/Dashboard.vue'), meta: { section: 'dashboard' } },
      { path: 'regions', name: 'ministry-regions', component: () => import('@/views/ministry/Regions.vue'), meta: { section: 'regions' } },
      { path: 'regions/:id', name: 'ministry-region-detail', component: () => import('@/views/ministry/RegionDetail.vue'), props: true, meta: { section: 'regions' } },
      { path: 'etablissements', name: 'ministry-schools', component: () => import('@/views/ministry/Schools.vue'), meta: { section: 'schools' } },
      { path: 'etablissements/:id', name: 'ministry-school-detail', component: () => import('@/views/ministry/SchoolDetail.vue'), props: true, meta: { section: 'schools' } },
      { path: 'finances-ape', name: 'ministry-ape-finance', component: () => import('@/views/ministry/ApeFinance.vue'), meta: { section: 'ape-finance' } },
      { path: 'inscriptions', name: 'ministry-live', component: () => import('@/views/ministry/LiveEnrollments.vue'), meta: { section: 'more' } },
      { path: 'alertes', name: 'ministry-alerts', component: () => import('@/views/ministry/Alerts.vue'), meta: { section: 'more' } },
      { path: 'profil', name: 'ministry-profile', component: () => import('@/views/ministry/Profile.vue'), meta: { section: 'more' } },
      { path: 'plus', name: 'ministry-more', component: () => import('@/views/ministry/More.vue'), meta: { section: 'more' } }
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const requiredRole = to.matched.find((r) => r.meta?.role)?.meta?.role
  if (!requiredRole) return true
  if (auth.currentRole !== requiredRole) {
    return auth.currentRole ? `/${auth.currentRole === 'ecole' ? 'ecole' : auth.currentRole}` : '/demo'
  }
  return true
})

export default router
