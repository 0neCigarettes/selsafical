<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Extras" icon="widgets" />
          <q-breadcrumbs-el label="Modal" icon="payments" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Modal" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Modal" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-sm q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Modal</div>
                  <p class="text-caption">Form {{this.title}} data modal salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.id_pengeluaran"
                        label="Modal ID"
                        lazy-rules
                        dense
                        readonly
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-select outlined v-model="form.jenis_modal" dense lazy-rules filled :options="options.jenis_modal" label="Jenis modal" />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.jumlah_retur"
                        label="Pemberi modal"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.jumlah_retur"
                        label="Jumlah modal diterima"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm q-mb-md">
                    <div class="col">
                      <q-input
                        v-model="form.keterangan_product"
                        filled
                        dense
                        label="Keterangan"
                        type="textarea"
                      />
                    </div>
                  </div>

                  <div>
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Reset" type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col fit">
          <q-card class="my-card q-pa-md col bg-blue-10">
            <q-breadcrumbs separator="---" class="text-white" active-color="secondary">
              <q-breadcrumbs-el label="Petunjuk penggunaan" icon="lightbulb" />
            </q-breadcrumbs>
          </q-card>

          <q-card class="my-card row q-mt-md" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="row q-gutter-sm items-center">
                  <div class="col">
                    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" style="height: 250px" />
                  </div>
                  <div class="col">
                    <q-timeline color="secondary">

                      <q-timeline-entry subtitle="Tahap I" side="left">
                        <div>
                          Silahkan pilih barang yang akan di keluarkan (produksi).
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 2" side="right">
                        <div>
                          Masukan jumlah setiap barang yang akan di keluarkan.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 3" side="right">
                        <div>
                          Berikan keterangan kegunaan barang di keluarkan lalu tekan submit.
                        </div>
                      </q-timeline-entry>

                    </q-timeline>
                  </div>
                </div>

              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>

</template>

<script>
import Lottie from 'components/lottie'
import * as animationData from 'assets/add.json'

let listProduk = []

export default {
  components: {
    lottie: Lottie
  },
  props: {
    editMode: Boolean,
    title: String
  },
  data () {
    return {
      form: {
        id_pengeluaran: this.$generateId(),
        products: [
          {
            product: null,
            jumlah_penjualan: null
          }
        ],
        tanggal_jatuh_tempo: null,
        alamat_penagihan: null,
        nomor_telepon: null,
        pelanggan: null,
        keterangan_product: null,
        status_penjualan: null
      },
      options: {
        products: [],
        jenis_modal: [
          'Mandiri', 'Dari Luar'
        ]
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
  },
  created () {
    this.getProduct()
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    stop: function () {
      this.anim.stop()
    },
    play: function () {
      this.anim.play()
    },
    pause: function () {
      this.anim.pause()
    },
    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed)
    },
    getProduct () {
      this.$api.get('product/get')
        .then(res => {
          listProduk = res.data.result
          // listProduk = list.map(product => {
          //   return product.nama_product
          // })
        })
    },
    filterProduct (val, update) {
      if (val === '') {
        update(() => {
          this.options.products = listProduk
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options.products = listProduk.filter(v => v.nama_product.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit () {
      const products = []
      let grandTotal = 0

      for (const i in this.form.products) {
        products.push({
          object_id: this.form.products[i].product._id,
          nama_product: this.form.products[i].product.nama_product,
          harga_jual: this.form.products[i].product.harga_jual,
          jumlah_penjualan: this.form.products[i].jumlah_penjualan,
          total: this.form.products[i].product.harga_jual * this.form.products[i].jumlah_penjualan,
          stokBaru: this.form.products[i].product.stok - this.form.products[i].jumlah_penjualan
        })
      }
      products.forEach(product => {
        grandTotal += product.total
      })

      const sendData = {
        id_penjualan: this.form.id_penjualan,
        products: products,
        grandTotal: grandTotal,
        tanggal_jatuh_tempo: this.form.tanggal_jatuh_tempo,
        alamat_penagihan: this.form.alamat_penagihan,
        nomor_telepon: this.form.nomor_telepon,
        pelanggan: this.form.pelanggan,
        status_penjualan: this.form.status_penjualan
      }

      try {
        this.$api.post('penjualan/add', sendData)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.$router.go(-1)
              this.$showNotif('Data penjualan berhasil di input !', 'positive')
            }
          })
      } catch (e) {
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    onReset () {
      for (const i in this.form.products) {
        this.form.products[i].product = null
        this.form.products[i].jumlah_penjualan = null
        if (i > 0) {
          this.form.products.splice(i, 1)
        }
      }
      this.form.tanggal_jatuh_tempo = null
      this.form.alamat_penagihan = null
      this.form.nomor_telepon = null
      this.form.pelanggan = null
      this.form.status_penjualan = null
    },
    add (index) {
      this.form.products.push({
        product: null,
        jumlah_penjualan: null
      })
    },
    remove (index) {
      this.form.products.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
