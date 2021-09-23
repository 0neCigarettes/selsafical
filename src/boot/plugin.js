import { boot } from 'quasar/wrappers'
import { Notify, Dialog } from 'quasar'

const showNotif = (message, jenis) => {
  Notify.create({
    message: message,
    color: jenis,
    timeout: 2000
  })
}

const formatPrice = (value) => {
  const val = (value / 1).toFixed(0).replace('.', '.')
  return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',-'
}
const dialog = Dialog

export default boot(({ app }) => {
  app.config.globalProperties.$showNotif = showNotif
  app.config.globalProperties.$dialog = dialog
  app.config.globalProperties.$formatPrice = formatPrice
})
