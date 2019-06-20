<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
export default {
  name: 'Navbar',
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="scss" scoped></style>
