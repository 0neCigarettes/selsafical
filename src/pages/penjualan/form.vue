<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Penjualan" icon="storefront" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Penjualan" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Penjualan" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-sm q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Penjualan</div>
                  <p class="text-caption">Form {{this.title}} data penjualan salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.id_penjualan"
                        label="Penjualan ID"
                        lazy-rules
                        dense
                        readonly
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                  </div>
                  <div v-for="(product, i) in form.products" :key="i">
                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-select
                          filled
                          v-model="product.nama_product"
                          label="Nama Product"
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
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="product.jumlah_penjualan"
                          label="Jumlah penjualan"
                          lazy-rules
                          dense
                          :rules="[ val => val && val > 0 || 'Jumlah penjualan tidak boleh 0 / kosong !']"
                        />
                      </div>
                    </div>

                    <q-separator class="q-mt-xs q-mb-xs"/>

                    <div class="row q-gutter-sm">
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Kategori Produk</div>
                          {{ product.nama_product ? product.nama_product.kategori : '--' }}
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Jenis Produk</div>
                          {{ product.nama_product ? product.nama_product.jenis : '--' }}
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Harga Jual</div>
                          {{ this.$formatPrice(product.nama_product ? product.nama_product.harga_jual : '0') }}
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Total</div>
                          {{ this.$formatPrice(product.nama_product ? product.nama_product.harga_jual * product.jumlah_penjualan : 0) }}
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

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="form.status_penjualan" dense lazy-rules filled :options="options.status" label="Status penjualan" />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.pelanggan"
                        label="Pelanggan"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data pelanggan']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.nomor_telepon"
                        label="Nomor Telepon"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data nomor telepon']"
                      />
                    </div>
                    <div class="col">
                    </div>
                  </div>

                  <div class="row q-gutter-sm" v-if="this.form.status_penjualan === 'Hutang'">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.alamat_penagihan"
                        label="Alamat penagihan"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data alamat penagihan']"
                      />
                    </div>
                    <div class="col">
                      <q-input filled v-model="form.tanggal_jatuh_tempo" mask="date" :rules="['date']" dense label="Tanggal jatuh tempo">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                              <q-date v-model="form.tanggal_jatuh_tempo">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
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
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">Petunjuk penggunaan</div>
                  <p class="text-caption">Cara pengisian form penjualan.</p>
                </div>

                <div class="row q-gutter-sm items-center">
                  <div class="col">
                    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" style="height: 250px" />
                  </div>
                  <div class="col">
                    <q-timeline color="secondary">

                      <q-timeline-entry subtitle="Tahap I" side="left">
                        <div>
                          Silahkan pilih produk yang akan di jual.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 2" side="right">
                        <div>
                          Sistem akan mengeluarkan data produk terdaftar berdasarkan pilihan.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 3" side="right">
                        <div>
                          Masukan jumlah produk yang akan di jual.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 4" side="right">
                        <div>
                          Sistem akan memberikan total penjualan yang telah dilakukan, selanjutnya tekan tombol submit.
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
import * as animationData from 'assets/lottie.json'

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
        id_penjualan: this.$generateId(),
        products: [
          {
            nama_product: null,
            kategori_product: null,
            jenis_product: null,
            harga_jual: null,
            jumlah_penjualan: null,
            total_penjualan: null
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
    setVal (value) {
      console.log(value)
      // this.form.products[i].kategori_product = 'aa'
    },
    getProduct () {
      this.$api.get('product/get')
        .then(res => {
          console.log(res.data)
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
        this.options.products = listProduk.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit () {
      const data = JSON.stringify(this.form)
      console.log(JSON.parse(data))
    },
    onReset () {

    },
    add (index) {
      this.form.products.push({
        nama_product: null,
        kategori_product: null,
        jenis_product: null,
        harga_jual: null,
        jumlah_penjualan: null,
        total_penjualan: null
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
