<template>
  <form-modal :editMode="true" title="Edit"/>
</template>
<script>
import formModal from './form'
export default {
  components: {
    formModal: formModal
  }
}
</script>
