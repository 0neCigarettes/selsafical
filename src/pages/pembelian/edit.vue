<template>
  <form-pembelian :editMode="true" title="Edit"/>
</template>
<script>
import formPembelian from './form'
export default {
  components: {
    formPembelian: formPembelian
  }
}
</script>
