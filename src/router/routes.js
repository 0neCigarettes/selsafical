
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/Signin.vue'),
    children: [
      { path: '', name: 'signin', component: () => import('src/pages/Access/Signin.vue') }
    ],
    meta: {
      authGuest: true
    }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/Index.vue') },
      { path: '/product', name: 'product', component: () => import('pages/Product.vue') },
      { path: '/add', name: 'product_add', component: () => import('pages/Product_add.vue') },
      { path: '/add_kategori', name: 'product_kategori_add', component: () => import('pages/Product_kategori_add.vue') },
      { path: '/add_jenis', name: 'product_jenis_add', component: () => import('pages/Product_jenis_add.vue') },
      { path: '/penjualan', name: 'penjualan', component: () => import('pages/Penjualan.vue') },
      { path: '/add_penjualan', name: 'penjualan_add', component: () => import('pages/Penjualan_add.vue') },
      { path: '/pembelian', name: 'pembelian', component: () => import('pages/Pembelian.vue') },
      { path: '/pengeluaran', name: 'pengeluaran', component: () => import('pages/Pengeluaran.vue') },
      { path: '/retur', name: 'retur', component: () => import('pages/Retur.vue') },
      { path: '/modal', name: 'modal', component: () => import('pages/Modal.vue') },
      { path: '/laporan', name: 'laporan', component: () => import('pages/Laporan.vue') }
    ],
    meta: {
      authAdmin: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () =>
      import('pages/Error404.vue')
  }
]

export default routes
