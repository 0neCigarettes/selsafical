<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Invoice" icon="receipt" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row">
          <div class="col">
            <div class="col-2 q-table__title text-h5"><strong>INVOICE</strong></div>
            <p class="text-caption">#ID-INVOICE</p>
          </div>
        </div>

        <div class="row col-12">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    title="Master Data Produk"
                    aria-label="Text"
                    class="text-h5"
                    :rows="rows"
                    flat
                    hide-bottom
                    :columns="columns"
                  >

                  <template v-slot:top-left>
                    <div class="col">
                      <div class="text-subtitle1 text-weight-medium"><strong>PELANGGAN</strong></div>
                      <div class="text-caption">{{pelanggan}}</div>
                      <div class="text-caption">ID Pelanggan : ID-019283761</div>
                      <div class="text-caption">Telephone : 089765431212</div>
                    </div>
                  </template>
                  <template v-slot:top-right>
                    <div class="col">
                      <div class="text-subtitle1 text-weight-medium text-right"><strong>ALAMAT</strong></div>
                      <div class="text-caption text-right">Jl. Pegangsaan Timur, No. 26 Jakarta Pusat</div>
                      <div class="text-caption text-right">01 Januari 2021</div>
                    </div>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="id_penjualan" :props="props">{{props.row.id_penjualan}}</q-td>
                      <q-td key="nama_product" :props="props">{{props.row.nama_product}}</q-td>
                      <q-td key="jumlah_penjualan" :props="props">{{props.row.jumlah_penjualan}}</q-td>
                      <q-td key="harga_jual" :props="props">{{props.row.harga_jual}}</q-td>
                      <q-td key="total" :props="props">{{props.row.total}}</q-td>
                    </q-tr>
                  </template>

                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>

</template>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      visibles: false,
      filterData: null,
      totalHutang: 0,
      totalLunas: 0,
      pelanggan: null,
      grandTotal: null,
      columns: [
        { name: 'id_penjualan', required: true, label: 'ID Barang', align: 'left', field: 'id_penjualan', sortable: true },
        { name: 'nama_product', required: true, label: 'Nama barang', align: 'left', field: 'nama_product', sortable: true },
        { name: 'jumlah_penjualan', required: true, label: 'Quantity', align: 'left', field: 'jumlah_penjualan', sortable: true },
        { name: 'harga_jual', required: true, label: 'Harga barang', align: 'left', field: 'harga_jual', sortable: true },
        { name: 'total', required: true, label: 'Total', align: 'left', field: 'total', sortable: true }
      ],
      rows: []
    }
  },
  created () {
    this.getPenjualan()
  },
  methods: {
    getPenjualan () {
      try {
        this.$api.get('penjualan/get')
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              const data = res.data.result
              this.rows = data
              for (let i = 0; i < data.length; i++) {
                if (data[i].status_penjualan === 'Lunas') {
                  this.totalLunas += data[i].grandTotal
                }
                if (data[i].status_penjualan === 'Hutang') {
                  this.totalHutang += data[i].grandTotal
                }
              }
            }
          })
      } catch (e) {
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    delete (id) {
      this.$dialog.create({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.delete('/penjualan/delete/' + id).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.totalLunas = 0
              this.totalHutang = 0
              this.getPenjualan()
              this.$showNotif(res.data.message, 'positive')
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    showDetail (pelanggan, data, grandTotal) {
      const newData = data.map(r => {
        return {
          nama_product: r.nama_product,
          harga_jual: this.$formatPrice(r.harga_jual),
          jumlah_penjualan: r.jumlah_penjualan,
          total: this.$formatPrice(r.total)
        }
      })
      this.detail.pelanggan = pelanggan
      this.detail.visible = true
      this.detail.rows = newData
      this.detail.grandTotal = grandTotal
    }
  }
}
</script>
<style scoped>
</style>
