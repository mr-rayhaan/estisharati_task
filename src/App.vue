<template>
  <div id="app">
    <app-header :scrolled="scrolled" />
    <!-- <featured-movie v-if="featuredMovie" :item="featuredMovie"/> -->
    <featured-manga v-if="featuredManga" :item="featuredManga" />
    <section class="lists">
      <scrollable-row v-for="(item, index) in categories" :key="index" :title="item" :list="randomRange()">
        <template v-slot="props">+
          <img v-if="props.item.img" :src="props.item.img" :alt="props.item.title"
            :class="listItem(item, props.item.id)" @click="showModal" />

          <movie-card :category="item" :id="props.item.id" :title="props.item.title" :year="props.item.release_date"
            :cover="movieImage(props.item)" :rank="props.item.vote_average" :actors="[]"
            :watchers="props.item.popularity" :likes="props.item.vote_count" />
        </template>
      </scrollable-row>
    </section>
    <loading v-if="moviesList.length <= 0" />
    <app-footer />


    <b-modal ref="my-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
    </b-modal>


  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
// import FeaturedMovie from "./components/FeaturedMovie";
import FeaturedManga from "./components/FeaturedManga";
import ScrollableRow from "./components/ScrollableRow";
import Loading from "./components/Loading";
import MovieCard from "./components/MovieCard";
import tmdbService from "./service/tmdb.service";
import * as ApiGenerate from "@/config/ApiGenerate";
import { Mangas } from "./config/api/Mangas";
import axios from "axios";
/* eslint-disable */
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    // FeaturedMovie,
    FeaturedManga,
    MovieCard,
    ScrollableRow,
    Loading,
  },
  created() {
    window.addEventListener("scroll", this.scrollListener);
    this.loadPage();
  },
  mounted() {
    this.loadMyPage();
  },
  data: () => ({
    scrolled: false,
    moviesList: [],
    mangasList: [],
    categories: [
      "Trending",
      "Newly Added",
      "Actions",
      "Romance",
      "Comedy",
      "Sci-Fi",
    ],
    featuredMovie: null,
    featuredManga: null,
    randomStart: null,
    endValue: 0,
    showClass: null,
  }),
  methods: {
    listItem(item, id) {
      // console.log("item", item, "id", id);
      return `title-image-${item.replace(/\s/g, "")}-${id}`;
    },
    showModal() {
      console.log('show modal');

      this.$refs['my-modal'].show()
    },
    showPopup(data) {
      this.showClass = data.srcElement.classList[0];
      console.log(document.getElementsByClassName(this.showClass)[0].style);
      var popupClass = `title-popup-${this.showClass.slice(
        12,
        this.showClass.length
      )}`;
      // document.getElementsByClassName(popupClass)[0].style.transitionDelay = "3s";
      document.getElementsByClassName(popupClass)[0].style.display = "block";

    },
    hidePopup() {
      var popupClass = `title-popup-${this.showClass.slice(
        12,
        this.showClass.length
      )}`;
      document.getElementsByClassName(popupClass)[0].style.display = "none";
      this.$refs['my-modal'].hide()
    },
    randomRange() {
      var random = Math.floor(Math.random() * this.mangasList.length);
      return this.mangasList.slice(random, random + 10);
    },
    sliceList() {
      return this.mangasList.slice(20, 30);
    },
    loadPage() {
      setTimeout(async () => {
        this.moviesList = await tmdbService.getHomeList();
        // console.log('moviesList', this.moviesList);
        this.featuredMovie = await tmdbService.getMovieInfo(70523, "tv");
      }, 1500);
    },
    async loadMyPage() {
      // console.log(Mangas);
      var response;
      try {
        const api = Mangas.getMangasList;
        // api.params = {
        //   c: "catalog",
        //   limit: 30,
        //   start: 0,
        // }
        // response = await ApiGenerate.generateAPI(api);
        response = await axios.get(
          "http://localhost:8080/manga/get_lastest.php?c=catalog&limit=100&start=0"
        );
        // console.log('response', response);
        // console.log('data', response.data);
        this.mangasList = response.data;
        this.featuredManga = this.mangasList[
          Math.floor(Math.random() * this.mangasList.length)
        ];
      } catch (error) {
        console.log("error", error);
      }
    },
    scrollListener() {
      this.scrolled = window.scrollY > 10;
    },
    movieImage(movie) {
      return `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollListener);
  },
};
</script>

<style lang="scss">
#app {
  .lists {
    margin-top: -100px;
  }
}
</style>
