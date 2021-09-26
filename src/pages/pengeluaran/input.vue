<template>
  <form-pengeluaran :editMode="false" title="Tambah"/>
</template>
<script>
import formPengeluaran from './form'
export default {
  components: {
    formPengeluaran: formPengeluaran
  }
}
</script>
