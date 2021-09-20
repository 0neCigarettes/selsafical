<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Produk" icon="emoji_events" />
          <q-breadcrumbs-el label="Tambah Produk" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">Tambah Data Produk</div>
                  <p class="text-caption">Form input data produk salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="id_product"
                        label="Product ID"
                        lazy-rules
                        dense
                        readonly
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="name_produk"
                        label="Nama produk"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data nama produk']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="kategori_product" dense lazy-rules filled :options="options_kategori" label="Kategori" />
                    </div>
                    <div class="col">
                      <q-select outlined v-model="jenis_product" dense lazy-rules filled :options="options_jenis" label="Jenis barang" />
                    </div>
                  </div>

                  <div class="row q-mt-md q-gutter-sm">
                    <div class="col">
                      <q-field
                        filled
                        dense
                        lazy-rules
                        v-model="hpp_product"
                        label="HPP"
                      >
                        <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                          <input :id="id" class="q-field__input" :model-value="value" @change="e => emitValue(e.target.value)" v-money="moneyFormatForDirective" v-show="floatingLabel">
                        </template>
                      </q-field>
                    </div>
                    <div class="col">
                      <q-field
                        filled
                        dense
                        lazy-rules
                        v-model="hargajual"
                        label="Harga jual"
                      >
                        <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                          <input :id="id" class="q-field__input" :model-value="value" @change="e => emitValue(e.target.value)" v-money="moneyFormatForDirective" v-show="floatingLabel">
                        </template>
                      </q-field>
                    </div>
                  </div>

                  <div class="row q-mt-md q-gutter-sm">
                    <div class="col">
                      <q-field
                        filled
                        dense
                        lazy-rules
                        v-model="hargamodal"
                        label="Harga modal"
                      >
                        <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                          <input :id="id" class="q-field__input" :model-value="value" @change="e => emitValue(e.target.value)" v-money="moneyFormatForDirective" v-show="floatingLabel">
                        </template>
                      </q-field>
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="stok_produk"
                        label="Stok produk"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data stok produk']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-file filled bottom-slots dense v-model="images" label="Foto produk" counter max-files="12">
                        <template v-slot:before>
                          <q-icon name="folder_open" />
                        </template>

                        <template v-slot:hint>
                          Field hint
                        </template>

                        <template v-slot:append>
                          <q-btn round dense flat icon="add" @click.stop />
                        </template>
                      </q-file>
                    </div>
                    <div class="col">
                    </div>
                  </div>

                  <div class="row q-py-sm q-gutter-sm">
                    <div class="col">
                      <q-input
                        v-model="keterangan_product"
                        filled
                        dense
                        label="Keterangan"
                        type="textarea"
                      />
                    </div>
                  </div>

                  <div class="q-mt-md">
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
                  <p class="text-caption">Cara pengisian form produk.</p>
                </div>

                <div class="row q-gutter-sm items-center">
                  <div class="col">
                    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" style="height: 250px" />
                  </div>
                  <div class="col">
                    <q-timeline :layout="layout" :side="side" color="secondary">

                      <q-timeline-entry subtitle="Tahap I" side="left">
                        <div>
                          Lakukan terlebih dahulu inputan untuk data kategori produk di dalam menu tambah kategori.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 2" side="right">
                        <div>
                          Lakukan terlebih dahulu inputan untuk data jenis produk di dalam menu tambah jenis produk.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 3" side="right">
                        <div>
                          Inputkan data produk sesuai dengan produk yang akan di daftarkan.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 4" side="right">
                        <div>
                          Pastikan data inputan sesuai dengan data yang ingin di daftarkan.
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
import { VMoney } from 'v-money'

export default {
  name: 'PageIndex',
  components: {
    lottie: Lottie
  },
  data () {
    return {
      hargamodal: null,
      moneyFormatForDirective: {
        decimal: ',',
        thousands: '.',
        prefix: 'IDR ',
        precision: 0,
        masked: true,
        locale: 'id-IDR'
      },
      hargajual: null,
      id_product: 'ID-981198',
      kategori_product: null,
      jenis_product: null,
      name_produk: null,
      hpp_product: null,
      keterangan_product: null,
      stok_produk: null,
      options_kategori: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      options_jenis: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2,
      images: null
    }
  },
  directives: { money: VMoney },
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

    }
  }
}
</script>

<style scoped>

</style>
