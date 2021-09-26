<template>
  <form-pengeluaran :editMode="true" title="Edit"/>
</template>
<script>
import formPengeluaran from './form'
export default {
  components: {
    formPengeluaran: formPengeluaran
  }
}
</script>
