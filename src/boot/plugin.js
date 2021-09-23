import { boot } from 'quasar/wrappers'
import { Notify, Dialog } from 'quasar'

const show = (message, jenis) => {
  Notify.create({
    message: message,
    color: jenis,
    timeout: 2000
  })
}

const dialog = Dialog

const baseImgURL = 'http://localhost:5050/'

export default boot(({ app }) => {
  app.config.globalProperties.$showNotif = show
  app.config.globalProperties.$dialog = dialog
  app.config.globalProperties.$baseImgURL = baseImgURL
})

export { show, baseImgURL, dialog }
