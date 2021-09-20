<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div v-if="!visible" class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el icon="inbox" label="Dashboard" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <transition
          appear
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated bounceOutRight"
        >

        <div class="row q-gutter-md">
          <q-card class="my-card col-lg-2 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px">Data Produk</div>
                  <div class="text-caption text-grey" style="font-size: 11px">
                    Berisi semua data produk salsafical.
                  </div>
                  <div class="text-h6 text-blue-13"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='2021' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon name="emoji_events" class="text-green-13" style="font-size: 5.4em;" />
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-2 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px">Penjualan</div>
                  <div class="text-caption text-grey" style="font-size:11px">
                    Berisi semua data penjualan salsafical.
                  </div>
                  <div class="text-h6 text-blue-13"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='1231' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon name="storefront" class="text-green-13" style="font-size: 5.4em;" />
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-2 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px">Pembelian</div>
                  <div class="text-caption text-grey" style="font-size: 11px">
                    Berisi semua data pembelian salsafical.
                  </div>
                  <div class="text-h6 text-blue-13"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='945' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon name="shopping_bag" class="text-green-13" style="font-size: 5.4em;" />
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-2 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px">Pengeluaran</div>
                  <div class="text-caption text-grey" style="font-size: 11px">
                    Berisi semua data pengeluaran salsafical.
                  </div>
                  <div class="text-h6 text-blue-13"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='1022' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon name="outbox" class="text-green-13" style="font-size: 5.4em;" />
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-2 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px">Barang Retur</div>
                  <div class="text-caption text-grey" style="font-size: 11px">
                    Berisi semua data barang retur salsafical.
                  </div>
                  <div class="text-h6 text-blue-13"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='345' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon name="cached" class="text-green-13" style="font-size: 5.4em;" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        </transition>

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-splitter
                    v-model="splitterModel"
                    class="col-sm-3"
                  >
                    <template v-slot:before>
                      <q-tabs
                        v-model="tabs"
                        vertical
                        class="text-blue"
                      >
                        <q-tab name="produk" icon="emoji_events" label="" />
                        <q-tab name="penjualan" icon="storefront" label="" />
                        <q-tab name="pembelian" icon="shopping_bag" label="" />
                        <q-tab name="pengeluaran" icon="outbox" label="" />
                        <q-tab name="retur" icon="cached" label="" />
                        <q-tab name="modal" icon="payments" label="" />
                        <q-tab name="customer" icon="sentiment_satisfied_alt" label="" />
                        <q-tab name="supplier" icon="local_shipping" label="" />
                      </q-tabs>
                    </template>

                    <template v-slot:after>
                      <q-tab-panels
                        v-model="tabs"
                        animated
                        swipeable
                        vertical
                        transition-prev="jump-up"
                        transition-next="jump-up"
                      >
                        <q-tab-panel name="produk" activated>
                          <q-table
                            title="Master Data"
                            :rows="rows"
                            :columns="columns"
                            row-key="name"
                            flat
                            :filter="filter"
                          >

                          <template v-slot:top>
                            <div class="col">
                              <div class="col-2 q-table__title">Master Data Produk</div>
                              <p class="text-caption">Data produk yang terdaftar di dalam sistem salsafical.</p>
                            </div>
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
                        </q-tab-panel>

                        <q-tab-panel name="penjualan">
                          <q-table
                            title="Master Data"
                            :rows="rows"
                            flat
                            :columns="columns"
                            row-key="name"
                            :filter="filter"
                          >

                          <template v-slot:top>
                            <div class="col">
                              <div class="col-2 q-table__title">Master Data Penjualan</div>
                              <p class="text-caption">Data penjualan yang dilakukan oleh salsafical.</p>
                            </div>
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
                        </q-tab-panel>

                        <q-tab-panel name="pembelian">
                          <q-table
                            title="Master Data"
                            :rows="rows"
                            flat
                            :columns="columns"
                            row-key="name"
                            :filter="filter"
                          >

                          <template v-slot:top>
                            <div class="col">
                              <div class="col-2 q-table__title">Master Data Pembelian</div>
                              <p class="text-caption">Data pembelian yang dilakukan oleh salsafical.</p>
                            </div>
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
                        </q-tab-panel>

                        <q-tab-panel name="pengeluaran">
                          <q-table
                            title="Master Data"
                            :rows="rows"
                            flat
                            :columns="columns"
                            row-key="name"
                            :filter="filter"
                          >

                          <template v-slot:top>
                            <div class="col">
                              <div class="col-2 q-table__title">Master Data Pengeluaran</div>
                              <p class="text-caption">Data pengeluaran barang yang dilakukan oleh salsafical.</p>
                            </div>
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
                        </q-tab-panel>

                        <q-tab-panel name="retur">
                          <q-table
                            title="Master Data"
                            :rows="rows"
                            :columns="columns"
                            flat
                            row-key="name"
                            :filter="filter"
                          >

                          <template v-slot:top>
                            <div class="col">
                              <div class="col-2 q-table__title">Master Data Barang Retur</div>
                              <p class="text-caption">Data barang retur yang ada di salsafical.</p>
                            </div>
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
                        </q-tab-panel>

                        <q-tab-panel name="modal">
                          <q-table
                            title="Master Data"
                            :rows="rows"
                            flat
                            :columns="columns"
                            row-key="name"
                            :filter="filter"
                          >

                          <template v-slot:top>
                            <div class="col">
                              <div class="col-2 q-table__title">Master Data Modal</div>
                              <p class="text-caption">Data modal yang didapatkan oleh salsafical.</p>
                            </div>
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
                        </q-tab-panel>

                        <q-tab-panel name="customer">
                          <q-table
                            title="Master Data"
                            :rows="rows"
                            flat
                            :columns="columns"
                            row-key="name"
                            :filter="filter"
                          >

                          <template v-slot:top>
                            <div class="col">
                              <div class="col-2 q-table__title">Master Data Customer</div>
                              <p class="text-caption">Data customer yang terdaftar salsafical.</p>
                            </div>
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
                        </q-tab-panel>

                        <q-tab-panel name="supplier">
                          <q-table
                            title="Master Data"
                            :rows="rows"
                            flat
                            :columns="columns"
                            row-key="name"
                            :filter="filter"
                          >

                          <template v-slot:top>
                            <div class="col">
                              <div class="col-2 q-table__title">Master Data Supplier / Vendor</div>
                              <p class="text-caption">Data supplier / vendor yang bermitra dengan salsafical.</p>
                            </div>
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
                        </q-tab-panel>
                      </q-tab-panels>
                    </template>
                  </q-splitter>
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
      tabs: 'produk',
      splitterModel: 5,
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

<style>
.bounce-enter-active{
  animation: bounce-in 0.5s;
}
.bounce-leave-active{
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in{
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.25);
  }
  100%{
    transform: scale(1);
  }
}
</style>
