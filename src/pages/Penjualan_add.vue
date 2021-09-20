/* eslint-disable */
<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Penjualan" icon="storefront" />
          <q-breadcrumbs-el label="Tambah Penjualan" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col-7">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">Tambah Data Penjualan</div>
                  <p class="text-caption">Form input data penjualan salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="id_penjualan"
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

                  <div class="form-group" v-for="(input,k) in inputs" :key="k">
                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-select
                          filled
                          v-model="input.nama_product"
                          use-input
                          input-debounce="0"
                          label="Nama product"
                          :options="options"
                          @filter="filterFn"
                          outlined
                          dense
                          lazy-rules
                          behavior="menu"
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
                          v-model="input.kategori_product"
                          label="Kategori product"
                          lazy-rules
                          dense
                          readonly
                          :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="input.jenis_product"
                          label="Jenis product"
                          lazy-rules
                          dense
                          readonly
                          :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                      </div>
                    </div>

                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-input
                          filled
                          v-model="input.harga_jual"
                          label="Harga jual"
                          lazy-rules
                          dense
                          readonly
                          :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="input.jumlah_penjualan"
                          label="Jumlah penjualan"
                          lazy-rules
                          dense
                          :rules="[ val => val && val.length > 0 || 'Lengkapi data harga modal']"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="input.total_penjualan"
                          label="Total penjualan"
                          lazy-rules
                          dense
                          readonly
                          :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                        />
                      </div>
                    </div>

                    <div class="row q-gutter-sm q-mb-md">
                      <div class="col">
                        <q-btn size="md" label="Tambah" class="q-mr-md" icon="add" type="submit" color="green" @click="add(k)" v-show="k == inputs.length-1" />
                        <q-btn size="md" label="Hapus" icon="delete_outline" type="submit" color="red" @click="remove(k)" v-show="k || ( !k && inputs.length > 1)" />
                      </div>
                      <div class="col">
                      </div>
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="status_penjualan" dense lazy-rules filled :options="options_status" label="Status penjualan" />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="pelanggan"
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
                        v-model="nomor_telepon"
                        label="Nomor Telepon"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data nomor telepon']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="alamat_penagihan"
                        label="Alamat penagihan"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data alamat penagihan']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input filled v-model="date" mask="date" :rules="['date']" dense label="Tanggal jatuh tempo">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                              <q-date v-model="date">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class="col">
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

        <div class="row col">
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
                    <q-timeline :layout="layout" :side="side" color="secondary">

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

const stringOptionsNamaProduct = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]

export default {
  components: {
    lottie: Lottie
  },
  data () {
    const options = stringOptionsNamaProduct
    return {
      inputs: [
        {
          nama_product: '',
          kategori_product: '',
          jenis_product: '',
          harga_jual: '',
          jumlah_penjualan: '',
          total_penjualan: ''
        }
      ],
      id_penjualan: 'ID-981198',
      options,
      date: null,
      alamat_penagihan: null,
      nomor_telepon: null,
      pelanggan: null,
      keterangan_product: null,
      options_kategori: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      status_penjualan: null,
      options_status: [
        'Lunas', 'Hutang'
      ],
      options_jenis: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptionsNamaProduct
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptionsNamaProduct.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
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
    onSubmit () {

    },
    onReset () {

    },
    add (index) {
      this.inputs.push({
        nama_product: '',
        kategori_product: '',
        jenis_product: '',
        harga_jual: '',
        jumlah_penjualan: '',
        total_penjualan: ''
      })
    },
    remove (index) {
      this.inputs.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
