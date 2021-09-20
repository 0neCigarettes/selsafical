/* eslint-disable */
<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Penjualan" icon="storefront" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-2 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">Penjualan belum dibayar</div>
                  <div class="text-caption text-grey" style="font-size:11px">
                    semua penjualan yang belum dibayarkan.
                  </div>
                  <div class="row items-center">
                    <q-icon name="payment" />
                    <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='1231' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
                  </div>
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-2 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">Data penjualan</div>
                  <div class="text-caption text-grey" style="font-size:11px">
                    berisi semua data penjualan salsafical.
                  </div>
                  <div class="row items-center">
                    <q-icon name="credit_score" />
                    <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='1231' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
                  </div>
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-2 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">Pelunasan dalam 30 hari terakhir</div>
                  <div class="text-caption text-grey" style="font-size:11px">
                    berisi semua data pelunasan dalam 30 hari.
                  </div>
                  <div class="row items-center">
                    <q-icon name="payments" />
                    <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='1231' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
                  </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    title="Master Data Produk"
                    aria-label="Text"
                    class="text-h5"
                    :rows="rows"
                    flat
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                    :visible-columns="visibleColumns"
                  >

                  <template v-slot:top="props">
                    <div class="col">
                      <div class="col-2 q-table__title">Master Data Penjualan</div>
                      <p class="text-caption">Data penjualan yang di lakukan di dalam sistem salsafical.</p>
                    </div>

                    <q-space />

                    <q-btn
                      flat round dense
                      :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                      @click="props.toggleFullscreen"
                      class="q-ml-md"
                    />
                    <q-btn
                      dense
                      icon="add"
                      class="q-ml-md q-pr-md"
                      color="blue-13"
                      :to="{ name: 'penjualan_add' }"
                      label="Tambah Penjualan"
                      no-caps
                    />
                  </template>

                  <template v-slot:top-right>
                    <q-btn
                      color="primary"
                      icon-right="archive"
                      label="Export csv"
                      no-caps
                      flat
                      @click="exportTable"
                      class="q-mr-lg"
                    />

                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                  </template>

                  <template v-slot:header="props">
                    <q-tr :props="props">
                      <q-th auto-width />
                      <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                      >
                        {{ col.label }}
                      </q-th>
                    </q-tr>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
                      </q-td>
                      <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                      >
                        {{ col.value }}
                      </q-td>
                    </q-tr>
                    <q-tr v-show="props.expand" :props="props">
                      <q-td colspan="100%">
                        <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
                      </q-td>
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
import Vue3autocounter from 'vue3-autocounter'
import { exportFile, useQuasar } from 'quasar'

export default {
  name: 'PageIndex',
  components: {
    'vue3-autocounter': Vue3autocounter
  },
  setup () {
    const $q = useQuasar()
    return {
      filter: null,
      columns,
      rows,
      exportTable () {
        // naive encoding to csv format
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          rows.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[col.field === void 0 ? col.name : col.field],
            col.format
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }
    }
  }
}

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]
</script>

<style scoped>

</style>
