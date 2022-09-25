<template>
  <div class="scrollableRow" v-if="list">
    <h2>{{title}}</h2>

    <div class="scrollableRow--arrowleft" @click="handleLeftArrow" v-show="scrollX < 0">&#9664;</div>
    <div class="scrollableRow--arrowright" @click="handleRightArrow">&#x25B6;</div>

    <div class="scrollableRow--listarea">
      <div class="scrollableRow--list" :style="[listStyle]">
        <div class="scrollableRow--item" v-for="item in list" :key="item.id">
          <slot v-bind:item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: true
    },
    list: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data: () => ({
    scrollX: 0
  }),
  computed: {
    listStyle() {
      return {
        marginLeft: this.scrollX + "px",
        width: this.list.length * 150 + "px"
      };
    }
  },
  methods: {
    handleLeftArrow(event) {
      const userScreenSize = Math.round(window.innerWidth / 2);
      let roll = this.scrollX + userScreenSize;
      if (roll > 0) {
        roll = 0;
      }
      this.scrollX = roll;
      console.log("scrollX left", this.scrollX)

    },
    handleRightArrow() {
      let listWidth = this.list.length * 150;
      const padding = 30;
      const userScreenSize = Math.round(window.innerWidth / 2);
      const remainingSpace = window.innerWidth - listWidth;
      let roll = this.scrollX - userScreenSize;
      if (remainingSpace > roll) {
        roll = remainingSpace - padding * 2;
      }
      this.scrollX = roll;
      console.log("scrollX right", this.scrollX)
    }
  }
};
</script>

<style lang="scss">
.scrollableRow {
  margin-bottom: 30px;

  h2 {
    margin: 0px 0px 0px 30px;
  }

  &--listarea {
    overflow-x: hidden;
    padding-left: 30px;
  }

  &--list {
    transition: all ease 0.5s;
  }

  &--item {
    display: inline-block;
    width: 150px;
    cursor: pointer;

    img {
      width: 100%;
      transform: scale(0.9);
      transition: all ease 0.2s;
      height: 200px;

      &:hover {
        transform: scale(1);
      }
    }
  }

  // &--item:hover {
  //   background-color: white;
  // }

  &--arrowleft,
  &--arrowright {
    position: absolute;
    width: 40px;
    height: 225px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
    transition: all ease 0.5s;

    @media (max-width: 760px) {
      opacity: 1;
    }
  }

  &--arrowleft {
    left: 0;
  }

  &--arrowright {
    right: 0;
  }

  &:hover {

    .scrollableRow--arrowleft,
    .scrollableRow--arrowright {
      opacity: 1;
    }
  }
}
</style>
