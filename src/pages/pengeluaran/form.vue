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
                        v-model="form.idPengeluaran"
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
                  <div v-for="(data, i) in form.datas" :key="i">
                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-select
                          filled
                          v-model="data.barang"
                          label="Nama Barang"
                          option-value="_id"
                          option-label="namaBarang"
                          :options="options.barangs"
                          use-input
                          @filter="filterData"
                          outlined
                          dense
                          :rules="[
                            val => val || 'Barang tidak boleh kosong !'
                            ]"
                        >
                        <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                              <q-item-section>
                                <q-item-label>{{ scope.opt.namaBarang }}</q-item-label>
                                <q-item-label caption>stok - {{ scope.opt.stok }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                Barang tidak ditemukan
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                      <div class="col">
                        <div class="col">
                        <q-input
                          :disable="data.barang === null"
                          filled
                          v-model="data.jumlahPengeluaran"
                          label="Jumlah pengeluaran"
                          lazy-rules
                          dense
                          :rules="[
                            val => val && val > 0 || 'Jumlah pengeluaran tidak boleh 0 dan harus angka !',
                            val => val && val <= data.barang.stok || 'Jumlah pengeluaran melebihi stok ! ('  + data.barang.stok + ')'
                          ]"
                        />
                      </div>
                      <div class="col">
                      </div>
                      </div>
                    </div>

                    <div class="row q-mt-sm q-gutter-sm">
                      <!-- <div class="col">
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
                      </div> -->
                    </div>

                    <q-separator class="q-mt-xs q-mb-xs"/>

                    <div class="row q-gutter-sm">
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Harga barang</div>
                          {{ this.$formatPrice(data.barang ? data.barang.hargaSatuan : 0) }}
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Total</div>
                          {{ this.$formatPrice(data.barang ? data.barang.hargaSatuan * data.jumlahPengeluaran : 0) }}
                      </div>
                      <div class="col">
                      </div>
                      <div class="col">
                      </div>
                    </div>

                    <div class="row q-gutter-sm q-mb-md q-mt-xs">
                      <div class="col">
                        <q-btn size="sm" outline class="q-mr-md" icon="add" type="submit" color="green" @click="add(i)" v-show="i == form.datas.length-1" />
                        <q-btn size="sm" outline icon="delete_outline" type="submit" color="red" @click="remove(i)" v-show="i || ( !i && form.datas.length > 1)" />
                      </div>
                      <div class="col">
                      </div>
                    </div>
                  </div>

                  <div class="row q-gutter-sm q-mb-md">
                    <div class="col">
                      <q-input
                        v-model="form.keterangan"
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

let listBarang = []

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
        idPengeluaran: this.$generateId(),
        datas: [
          {
            barang: null,
            jumlahPengeluaran: null
          }
        ],
        keterangan: null
      },
      options: {
        barangs: [],
        status: [
          'Lunas', 'Hutang'
        ]
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
  },
  created () {
    this.getBarang()
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
    getBarang () {
      this.$api.get('pembelian/detail')
        .then(res => {
          listBarang = res.data.result.filter(r => {
            return r.stok > 0
          })
          // console.log(listBarang)
        })
    },
    filterData (val, update) {
      if (val === '') {
        update(() => {
          this.options.barangs = listBarang
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options.barangs = listBarang.filter(v => v.namaBarang.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit () {
      let grandTotal = 0
      const barangs = this.form.datas.map(i => {
        return {
          ObjectId: i.barang._id,
          namaBarang: i.barang.namaBarang,
          hargaBarang: i.barang.hargaSatuan,
          jumlahPengeluaran: i.jumlahPengeluaran,
          total: i.jumlahPengeluaran * i.barang.hargaSatuan,
          stokBaru: i.barang.stok - i.jumlahPengeluaran
        }
      })
      barangs.forEach(r => {
        grandTotal += r.total
      })
      const sendData = {
        idPengeluaran: this.form.idPengeluaran,
        barangs: barangs,
        grandTotal: grandTotal,
        keterangan: this.form.keterangan
      }
      try {
        this.$api.post('pengeluaran/add', sendData)
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
      for (const i in this.form.datas) {
        this.form.datas[i].barang = null
        this.form.datas[i].jumlahPengeluaran = null
        if (i > 0) {
          this.form.datas.splice(i)
        }
      }
      this.form.keterangan = null
    },
    add (index) {
      this.form.datas.push({
        barang: null,
        jumlahPengeluaran: null
      })
    },
    remove (index) {
      this.form.datas.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
