<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Barang" icon="extension" />
          <q-breadcrumbs-el label="Pembelian" icon="shopping_bag" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Pembelian" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Pembelian" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-sm q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Pembelian</div>
                  <p class="text-caption">Form {{this.title}} data pembelian salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.id_pembelian"
                        label="Pembelian ID"
                        lazy-rules
                        dense
                        readonly
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                    </div>
                  </div>
                  <div v-for="(barang, i) in form.barangs" :key="i">
                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-input
                          filled
                          v-model="barang.namaBarang"
                          label="Nama barang"
                          lazy-rules
                          dense
                          :rules="[ val => val && val.length > 0 || 'Nama barang tidak boleh kosong !']"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="barang.jumlahPembelian"
                          label="Jumlah pembelian"
                          lazy-rules
                          dense
                          :rules="[ val => val && val > 0 || 'Jumlah pembelian tidak boleh 0 / kosong !']"
                        />
                      </div>
                    </div>

                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-input
                          filled
                          v-model="barang.hargaSatuan"
                          label="Harga satuan"
                          lazy-rules
                          dense
                          :rules="[ val => val && val > 0 || 'Harga satuan tidak boleh 0 / kosong !']"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="barang.pajak"
                          label="Pajak"
                          lazy-rules
                          dense
                          :rules="[ val => val && val > 0 || 'Pajak tidak boleh 0 / kosong !']"
                        >
                          <template v-slot:append>
                            <label class="text-h6 text-subtitle2">%</label>
                          </template>
                        </q-input>
                      </div>
                    </div>

                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-input
                          filled
                          v-model="barang.deskripsi"
                          label="Deskripsi"
                          lazy-rules
                          dense
                          :rules="[ val => val && val.length > 0 || 'Deskripsi barang tidak boleh 0 / kosong !']"
                        />
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Total per barang</div>
                        {{ this.$formatPrice(barang.jumlahPembelian && barang.hargaSatuan && barang.pajak? ((barang.jumlahPembelian * barang.hargaSatuan) + (((barang.jumlahPembelian * barang.hargaSatuan)*barang.pajak)/100)) : 0) }}
                      </div>
                    </div>

                    <div class="row q-gutter-sm q-mb-md">
                      <div class="col">
                        <q-btn size="sm" outline class="q-mr-md" icon="add" type="submit" color="green" @click="add(i)" v-show="i == form.barangs.length-1" />
                        <q-btn size="sm" outline icon="delete_outline" type="submit" color="red" @click="remove(i)" v-show="i || ( !i && form.barangs.length > 1)" />
                      </div>
                      <div class="col">
                      </div>
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="Status pembelian" />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.supplier"
                        label="Supplier"
                        lazy-rules
                        dense
                        :rules="[ val => val && val !== null || 'Lengkapi data supplier']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.nomorTelepon"
                        label="Nomor Telepon"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data nomor telepon']"
                      />
                    </div>
                    <div class="col">
                    </div>
                  </div>

                  <div class="row q-gutter-sm" v-if="this.form.statusPembelian === 'Hutang'">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.alamatSupplier"
                        label="Alamat supplier"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data alamat supplier']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        v-model="form.tanggalJatuhTempo"
                        filled
                        label="Tanggal jatuh tempo"
                        dense
                        :rules="['YYYY-MM-DD']"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="form.tanggal_jatuh_tempo" :breakpoint="600">
                              <q-date v-model="form.tanggalJatuhTempo" mask="YYYY-MM-DD" filled ref="date">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Ok" color="primary" flat />
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
                    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" style="height: 300px" />
                  </div>
                  <div class="col">
                    <q-timeline color="secondary">

                      <q-timeline-entry subtitle="Tahap I" side="left">
                        <div>
                          Silahkan masukan nama barang yang dibeli melalui supplier.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 2" side="right">
                        <div>
                          Selanjutnya masukan jumlah pembelian, harga barang persatuan, jumlah pajak yang ahrus dibayar per barang serta deskripsi barang.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 3" side="right">
                        <div>
                          Masukan status pembelian, hutang atau beli lunas, jika pembelian dengan status hutang masukan data tanggal jatuh tempo serta alamat supplier untuk proses konfirmasi pembayaran.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 4" side="right">
                        <div>
                          Pastikan seluruh data sudah benar lalu tekan tombol submit untuk melakukan input data pembelian.
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
import * as animationData from 'assets/add_penjualan.json'

// const listProduk = []

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
        id_pembelian: this.$generateId(),
        barangs: [
          {
            namaBarang: null,
            jumlahPembelian: null,
            hargaSatuan: null,
            pajak: null,
            deskripsi: null
          }
        ],
        statusPembelian: null,
        supplier: null,
        nomorTelepon: null,
        alamatSupplier: null,
        tanggalJatuhTempo: null
      },
      options: {
        status: [
          'Lunas', 'Hutang'
        ]
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
  },
  created () {
    // this.getProduct()
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
    // getProduct () {
    //   this.$api.get('product/get')
    //     .then(res => {
    //       listProduk = res.data.result
    //       // listProduk = list.map(product => {
    //       //   return product.nama_product
    //       // })
    //     })
    // },
    // filterProduct (val, update) {
    //   if (val === '') {
    //     update(() => {
    //       this.options.products = listProduk
    //     })
    //     return
    //   }

    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.options.products = listProduk.filter(v => v.nama_product.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
    onSubmit () {
      try {
        let grandTotal = 0
        const barangs = this.form.barangs.map(r => {
          return {
            namaBarang: r.namaBarang,
            hargaSatuan: r.hargaSatuan,
            pajak: r.pajak,
            jumlahPembelian: r.jumlahPembelian,
            total: ((r.jumlahPembelian * r.hargaSatuan) + (((r.jumlahPembelian * r.hargaSatuan) * r.pajak) / 100)),
            stok: r.jumlahPembelian,
            deskripsi: r.deskripsi
          }
        })

        barangs.forEach(product => {
          grandTotal += product.total
        })

        const sendData = {
          id_pembelian: this.form.id_pembelian,
          barangs: barangs,
          grandTotal: grandTotal,
          statusPembelian: this.form.statusPembelian,
          supplier: this.form.supplier,
          nomorTelepon: this.form.nomorTelepon,
          alamatSupplier: this.form.alamatSupplier,
          tanggalJatuhTempo: this.form.tanggalJatuhTempo
        }

        this.$api.post('pembelian/add', sendData)
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
      for (const i in this.form.barangs) {
        this.form.barangs[i].namaBarang = null
        this.form.barangs[i].jumlahPembelian = null
        this.form.barangs[i].hargaSatuan = null
        this.form.barangs[i].pajak = null
        this.form.barangs[i].deskripsi = null
        if (i > 0) {
          this.form.barangs.splice(i)
        }
      }
      this.form.tanggal_jatuh_tempo = null
      this.form.alamat_penagihan = null
      this.form.nomor_telepon = null
      this.form.pelanggan = null
      this.form.status_penjualan = null
    },
    add (index) {
      this.form.barangs.push({
        namaBarang: null,
        jumlahPembelian: null,
        hargaSatuan: null,
        pajak: null,
        deskripsi: null
      })
    },
    remove (index) {
      this.form.barangs.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
