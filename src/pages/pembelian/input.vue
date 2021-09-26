<template>
  <form-pembelian :editMode="false" title="Tambah"/>
</template>
<script>
import formPembelian from './form'
export default {
  components: {
    formPembelian: formPembelian
  }
}
</script>
