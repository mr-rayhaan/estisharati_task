<template>
  <div id="app">
    <app-header :scrolled="scrolled" />
    <!-- <featured-movie v-if="featuredMovie" :item="featuredMovie"/> -->
    <featured-manga v-if="featuredManga" :item="featuredManga" />
    <section class="lists">
      <scrollable-row v-for="(item, index) in categoriesHomePage()" :key="index" :title="item"
        :list="indexedRange(item)">
        <template v-slot="props">+
          <img v-if="props.item.img" :src="props.item.img" :alt="props.item.title"
            :class="listItem(item, props.item.id)" @click="showModal(props.item)" />

        </template>
      </scrollable-row>
    </section>
    <loading v-if="moviesList.length <= 0" />
    <app-footer />

    <MangaModal v-if="modalShow" :selectedManga="selectedManga" @close-modal="closeModal"></MangaModal>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import MangaModal from "./components/MangaModal";
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
    MangaModal,
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
    ],
    genres: null,
    featuredMovie: null,
    featuredManga: null,
    randomStart: null,
    endValue: 0,
    showClass: null,
    modalShow: false,
    selectedManga: null,
  }),
  computed: {
  },
  methods: {

    categoriesHomePage() {
      return this.categories.slice(0, 6);
    },
    listItem(item, id) {
      // console.log("item", item, "id", id);
      return `title-image-${item.replace(/\s/g, "")}-${id}`;
    },
    showModal(data) {
      console.log("show modal", data);
      this.modalShow = !this.modalShow;
      this.selectedManga = data;
      // this.$refs['my-modal'].show()
    },
    closeModal() {
      console.log('close modal')
      this.modalShow = false;
      this.selectedManga = null;
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
      this.$refs["my-modal"].hide();
    },
    randomRange() {
      var random = Math.floor(Math.random() * this.mangasList.length);
      console.log('randomRange')
      return this.mangasList.slice(random, random + 10);
    },
    sliceList() {
      return this.mangasList.slice(20, 30);
    },
    indexedRange(item) {
      var regExp = /[a-zA-Z]/g;
      // var testString = "john";

      // if(regExp.test(testString)){}
      switch (item) {
        case 'Action':
          return this.mangasList.filter((x) => { return x.genres.indexOf(item) > -1 ? item : null });
          break;
        case 'Adventure':
          return this.mangasList.filter((x) => { return x.genres.indexOf(item) > -1 ? item : null });
          break;
        case 'Martial':
          return this.mangasList.filter((x) => { return x.genres.indexOf(item) > -1 ? item : null });
          break;
        case 'Arts':
          return this.mangasList.filter((x) => { return x.genres.indexOf(item) > -1 ? item : null });
          break;
        case 'Drama':
          return this.mangasList.filter((x) => { return x.genres.indexOf(item) > -1 ? item : null });
          break;
        case 'Romance':
          return this.mangasList.filter((x) => { return x.genres.indexOf(item) > -1 ? item : null });
          break;
      }
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
        console.log('mangasList', this.mangasList);
        this.featuredManga = this.mangasList[
          Math.floor(Math.random() * this.mangasList.length)
        ];
        this.genres = new Set();
        for (var i = 0; i < this.mangasList.length; i++) {
          var tempList = [];
          tempList = this.mangasList[i].genres.split(" ");

          for (let element of tempList) {
            element = element.toLowerCase().replace(/[^a-z]/g, '');
            if (element !== "") {
              this.genres.add(element.charAt(0).toUpperCase() + element.slice(1));
              this.categories.push(element.charAt(0).toUpperCase() + element.slice(1));
            }
          }
        }
        console.log(this.genres);
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