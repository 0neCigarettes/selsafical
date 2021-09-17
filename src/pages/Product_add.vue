/* eslint-disable */
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

                  <div class="row q-py-sm q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="kategori_product" dense lazy-rules filled :options="options_kategori" label="Kategori" />
                    </div>
                    <div class="col">
                      <q-select outlined v-model="jenis_product" dense lazy-rules filled :options="options_jenis" label="Jenis barang" />
                    </div>
                  </div>

                  <div class="row q-py-sm q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="hpp_product"
                        label="HPP"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data HPP']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="harga_modal"
                        label="Harga modal"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga modal']"
                      />
                    </div>
                  </div>

                  <div class="row q-py-sm q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="harga_jual"
                        label="Harga jual"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
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
              <q-card-section class="row">
                <div class="col">
                  <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" style="height: 250px" />
                </div>
                <div class="col">
                  lorem lorem
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

export default {
  components: {
    lottie: Lottie
  },
  data () {
    return {
      id_product: 'ID-981198',
      kategori_product: null,
      jenis_product: null,
      name_produk: null,
      hpp_product: null,
      harga_jual: null,
      harga_modal: null,
      keterangan_product: null,
      options_kategori: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      options_jenis: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
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
      // id_product.value = null
      // keterangan_product.value = null
      // jenis_product.value = null
      // kategori_product.value = null
      // name_produk.value = null
      // hpp_product.value = null
      // harga_modal.value = null
      // harga_jual.value = null
    }
  }
}
</script>

<style scoped>

</style>
