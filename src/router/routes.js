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
      { path: '/product/input', name: 'product_add', component: () => import('pages/product/input.vue') },
      { path: '/product/edit/:id', name: 'product_edit', component: () => import('pages/product/edit.vue') },
      { path: '/kategoriproduk/input', name: 'product_kategori_add', component: () => import('pages/kategori_product/input.vue') },
      { path: '/kategoriproduk/edit/:id', name: 'product_kategori_edit', component: () => import('pages/kategori_product/edit.vue') },
      { path: '/jenisproduk/input', name: 'product_jenis_add', component: () => import('pages/jenis_product/input.vue') },
      { path: '/jenisproduk/edit/:id', name: 'product_jenis_edit', component: () => import('pages/jenis_product/edit.vue') },
      { path: '/penjualan', name: 'penjualan', component: () => import('pages/Penjualan.vue') },
      { path: '/penjualan/input', name: 'penjualan_add', component: () => import('pages/penjualan/input.vue') },
      { path: '/pembelian', name: 'pembelian', component: () => import('pages/Pembelian.vue') },
      { path: '/pembelian/input', name: 'pembelian_add', component: () => import('pages/pembelian/input.vue') },
      { path: '/pengeluaran', name: 'pengeluaran', component: () => import('pages/Pengeluaran.vue') },
      { path: '/pengeluaran/input', name: 'pengeluaran_add', component: () => import('pages/pengeluaran/input.vue') },
      { path: '/retur', name: 'retur', component: () => import('pages/Retur.vue') },
      { path: '/retur/input', name: 'retur_add', component: () => import('pages/retur/input.vue') },
      { path: '/modal', name: 'modal', component: () => import('pages/Modal.vue') },
      { path: '/laporan', name: 'laporan', component: () => import('pages/Laporan.vue') },
      { path: '/profile', name: 'profile', component: () => import('pages/Profile.vue') }
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
