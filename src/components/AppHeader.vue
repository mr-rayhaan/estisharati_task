<template>
  <header :class="{scrolled}">
    <div class="header--logo">
      <img
        src="@/assets/estisharati-logo-min.webp"
        alt="Estisharati_Logo" style="height:200%"
      >
    </div>
    <div class="header--user">
      <img
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Estisharati_Avatar"
      >
    </div>
  </header>
</template>
>

<script>
export default {
  props: {
    scrolled: false
  }
};
</script>


<style lang="scss">
header {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: transparent;
  transition: all ease 0.2s;
}

header.scrolled {
  background: #141414;
}

.header--logo {
  height: 25px;
}

.header--logo img {
  height: 100%;
}

.header--user {
  border-radius: 3px;
  height: 35px;
}

.header--user img {
  height: 100%;
}
</style>
