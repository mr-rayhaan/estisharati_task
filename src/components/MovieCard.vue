
<template>
  <div class="card" :class="className">
    <div class="rank">{{rank}}</div>

    <div class="cover">
      <div class="thumbnail" v-bind:style="{ backgroundImage: 'url(' + cover + ')' }"></div>

      <h3 class="title">{{title}}</h3>
      <div class="summary">
        <p class="year">{{year}}</p>
        <div class="casting">
          <img v-for="actor in actors" :key="actor.key" :src="actor.photo" :alt="actor.name">
        </div>
      </div>
    </div>

    <div class="card-info">
      <div class="popularity">
        <p class="count">
          {{watchers}}
          <span>Watching</span>
        </p>
        <p class="count">
          {{likes}}
          <span>Likes</span>
        </p>
      </div>

      <button class="btn">{{action}}</button>

      <div class="casting">
        <div class="cast" v-for="actor in actors" :key="actor.id">
          <div class="icon">
            <img :src="actor.photo" :alt="actor.name">
          </div>
          <p class="character">{{actor.character}}</p>
          <p class="actor">{{actor.name}}</p>
        </div>
      </div>
    </div>

    <div class="background"></div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: "MovieCard",
  props: {
    category: {
      type: String,
      required: true,
      default: 'none'
    },
    id: {
      type: String,
      required: true,
      default: '0'
    },
    title: {
      type: String,
      required: false,
      default: 'title',
    },
    year: {
      type: String,
      required: false,
      default: 'year',
    },
    rank: {
      type: Number,
      required: false,
      default: 1,
    },
    cover: {
      type: String,
      required: false,
      default: 'cover'
    },
    actors: {
      type: Array,
      required: false,
      default: []
    },
    watchers: {
      type: Number,
      required: false,
      default: 1
    },
    likes: {
      type: Number,
      required: false,
      default: 1,
    },
    action: {
      type: String,
      default: "Watch Now"
    }
  },
  computed: {
    className() {
      return `title-popup-${this.category}-${this.id}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$clr-gray: #2a2c2e;
$clr-dark: #000000;
$clr-light: #fff;
$clr-accent: #ff0101;
$clr-secondary: #585858;

.btn {
  cursor: pointer;
  border: 0;
  background: $clr-secondary;
  border-radius: 100vw;
  color: $clr-light;
  font-weight: bold;
  padding: 0.5em 1.5em;
  text-transform: uppercase;

  &:hover {
    background: $clr-accent;
  }
}

.background {
  background-color: $clr-gray;
  position: absolute;
  right: 0;
  left: 0;
  bottom: -2em;
  top: 5%;
  padding: 5em;
  transform: scale(0.5, 1.5);
  opacity: 0;
  border-radius: 0.5em;
  z-index: 20;
}

.card {
  position: relative;
  width: 12.5em;
  cursor: pointer;
  display: none;

  &:hover {
    .rank {
      transform: translate(175%, -115%);
      border-top-right-radius: 0.5em;
      clip-path: polygon(100% 0, 100% 49%, 100% 100%, 50% 85%, 0 100%, 0 0);
      z-index: 1000;
    }

    .cover {
      position: relative;
      right: 0;
      left: 0;
      transform: translateY(-40%) scale(0.8);
      z-index: 40;

      .title {
        animation: movieTitle 250ms forwards;
      }
    }

    .card-info {
      opacity: 1;
      transition: transform 250ms ease, opacity 150ms linear;
      transform: translate(0);
      z-index: 21;

      .casting {
        width: 130%;
        justify-content: space-between;
      }

      .cast {
        font-size: 0.9rem;

        .character {
          font-weight: bold;
        }
      }
    }

    .background {
      transform: scale(1.4, 1.5);
      transition: transform 300ms cubic-bezier(0.25 1, 0.8, 1),
        opacity 100ms linear;
      opacity: 1;
    }

    .summary {
      opacity: 0;
    }
  }
}

.casting {
  display: flex;
  text-align: center;

  img {
    height: 2em;
    width: 2em;
    border-radius: 50%;
  }
}

.rank {
  position: absolute;
  top: -1px;
  right: 1em;
  font-weight: bold;
  font-size: 1.125rem;
  background: $clr-accent;
  padding: 0.3em 0.75em 0.75em;
  clip-path: polygon(0 0, 100% 2%, 100% 100%, 0 75%);
  transition: transform 300ms cubic-bezier(0.25 1, 0.8, 1);
}

.cover {
  transition: 250ms;

  .thumbnail {
    height: 150px;
    width: 100%;
    border-radius: 0.5em;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .title {
    margin: 0.75em 0;
  }

  .summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .casting {
    img {
      border: 5px solid $clr-dark;

      &:nth-of-type(1) {
        transform: translateX(50%);
        z-index: 1;
      }

      &:nth-of-type(2) {
        transform: translateX(25%);
      }
    }
  }
}

img {
  max-width: 100%;
}

.card-info {
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  margin: 1em 0;

  .popularity {
    columns: 2;
    column-rule: 1px solid rgba(255, 255, 255, 0.25);
    text-align: center;
  }

  .count {
    font-size: 1.125rem;

    span {
      font-size: 0.85rem;
      display: block;
    }
  }
}

@keyframes movieTitle {
  0% {
    text-align: left;
    opacity: 1;
  }

  20% {
    text-align: left;
    opacity: 0;
  }

  50% {
    text-align: center;
    opacity: 0;
    transform: scale(1.2);
  }

  100% {
    text-align: center;
    opacity: 1;
  }
}
</style>
