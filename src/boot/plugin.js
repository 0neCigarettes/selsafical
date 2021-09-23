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

const listMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember']

const parseDate = (date) => {
  let respon
  if (date === '' || date === null || date === undefined) {
    respon = {
      date: '-',
      dateLocal: '-',
      fullDate: '-',
      timeStap: '-'
    }
  } else {
    const newDate = new Date(date)
    const month = '' + (newDate.getMonth() + 1)
    const tgl = '' + (newDate.getDate())
    const year = newDate.getFullYear()
    const full = tgl + ' ' + listMonth[month - 1] + ' ' + year
    respon = {
      date: [year, month < 10 ? 0 + '' + (month) : (month), tgl < 10 ? 0 + '' + tgl : tgl].join('/') + '_' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds(),
      dateLocal: [year, month < 10 ? 0 + '' + (month) : (month), tgl < 10 ? 0 + '' + tgl : tgl].join('/'),
      fullDate: full,
      timeStap: `${full} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    }
  }
  return respon
}

const dialog = Dialog

export default boot(({ app }) => {
  app.config.globalProperties.$showNotif = showNotif
  app.config.globalProperties.$dialog = dialog
  app.config.globalProperties.$formatPrice = formatPrice
  app.config.globalProperties.$parseDate = parseDate
})
