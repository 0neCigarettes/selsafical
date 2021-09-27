<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Barang" icon="extension" />
          <q-breadcrumbs-el label="Pengeluaran" icon="outbox" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Pengeluaran" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Pengeluaran" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-sm q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Pengeluaran</div>
                  <p class="text-caption">Form {{this.title}} data pengeluaran salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.id_pengeluaran"
                        label="Pengeluaran ID"
                        lazy-rules
                        dense
                        readonly
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                    </div>
                  </div>
                  <div v-for="(product, i) in form.products" :key="i">
                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-select
                          filled
                          v-model="product.product"
                          label="Supplier / Vendor"
                          option-value="_id"
                          option-label="nama_product"
                          :options="options.products"
                          use-input
                          @filter="filterProduct"
                          outlined
                          dense
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                Produk tidak ditemukan
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                      <div class="col">
                        <q-select
                          filled
                          v-model="product.product"
                          label="Nama barang"
                          option-value="_id"
                          option-label="nama_product"
                          :options="options.products"
                          use-input
                          @filter="filterProduct"
                          outlined
                          dense
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                Produk tidak ditemukan
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>

                    <div class="row q-mt-sm q-gutter-sm">
                      <div class="col">
                        <q-input
                          filled
                          v-model="product.jumlah_penjualan"
                          label="Jumlah pengeluaran"
                          lazy-rules
                          dense
                          :rules="[ val => val && val > 0 || 'Jumlah penjualan tidak boleh 0 / kosong !']"
                        />
                      </div>
                      <div class="col">
                      </div>
                    </div>

                    <q-separator class="q-mt-xs q-mb-xs"/>

                    <div class="row q-gutter-sm">
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Harga barang</div>
                          {{ this.$formatPrice(product.product ? product.product.harga_jual : 0) }}
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Total</div>
                          {{ this.$formatPrice(product.product ? product.product.harga_jual * product.jumlah_penjualan : 0) }}
                      </div>
                      <div class="col">
                      </div>
                      <div class="col">
                      </div>
                    </div>

                    <div class="row q-gutter-sm q-mb-md q-mt-xs">
                      <div class="col">
                        <q-btn size="sm" outline class="q-mr-md" icon="add" type="submit" color="green" @click="add(i)" v-show="i == form.products.length-1" />
                        <q-btn size="sm" outline icon="delete_outline" type="submit" color="red" @click="remove(i)" v-show="i || ( !i && form.products.length > 1)" />
                      </div>
                      <div class="col">
                      </div>
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
        status: [
          'Lunas', 'Hutang'
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
