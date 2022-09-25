<template>
    <transition name="fade">
        <div class="vue-modal" style="color:black">
            <transition name="drop-in">
                <div class="vue-modal-inner">
                    <div class="vue-modal-content">
                        <div class="top">
                            <div>
                                <h3>{{selectedManga !== null ? selectedManga.title : ''}}</h3>
                            </div>
                            <div style="cursor:pointer">
                                <i class="fa-solid fa-xmark" @click="closeModal()">&nbsp;&nbsp;&nbsp;X</i>
                            </div>
                        </div>
                        <div style="display:flex">
                            <div style="padding:1rem; display: grid;">
                                <p>{{selectedManga !== null ? selectedManga.description : ''}}</p>
                                <p style="align-self: end;">
                                    <span style="font-style:italic">Author: </span>
                                    <span style="color:lawngreen">{{selectedManga.author}}</span>
                                </p>
                            </div>
                            <div v-if="selectedManga !== null"><img :src="selectedManga.img"
                                    :alt="selectedManga.title" /></div>

                        </div>
                    </div>
                </div>
                <!-- <b-modal ref="my-modal" hide-footer title="Using Component Methods">
            
          </b-modal> -->
            </transition>
        </div>
    </transition>
</template>
<script>
export default {
    props: ["selectedManga"],

    mounted() {
        this.values = { ...this.selectedVideoEdit };
    },
    methods: {
        closeModal() {
            console.log('close Modal')
            this.$emit("close-modal");
        },
    },
    watch: {
        selectedManga(value) {
            if (value !== null) {
                this.values = value;
                // this.formTitle = value.title;
                // this.formDescription = value.description;
            }
        },
    },
};
</script>
<style>
@media only screen and (min-width: 700px) {

    /* CSS that should be displayed if width is equal to or greater than 700px goes here */
    .vue-modal-inner {
        max-width: 50%;
    }
}

@media only screen and (min-width: 1200px) {

    #upload_video_icon,
    #sort_videos_icon {
        display: none !important;
    }
}

@media only screen and (max-width: 400px) {

    /* CSS that should be displayed if width is equal to or less than 400px goes here */
    .vue-modal-inner {
        max-width: 100%;
    }
}

::before,
::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.vue-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
}

.vue-modal-inner {
    margin: 2rem auto;

    top: 20%;
    position: relative;
}

.vue-modal-content {
    position: relative;
    background-color: black;
    color: whitesmoke;
    border: 1px solid #333;
    background-clip: padding-box;
    border-radius: 0.3rem;
    padding: 1rem 1rem 2rem 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
    transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.pointer {
    cursor: pointer;
}
</style>
<style scoped>
.top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 1rem;
}
</style>
