<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/interface/header.vue'
</script>

<template>
    <Header />
    <div
        class="
            container
            px-0
            body-container
            flex flex-col
            justify-center
            bg-gradient-to-r
            from-purple-400
            via-pink-500
            to-red-500
            max-w-full
        "
    >
        <router-view />
    </div>
</template>

<style>
.body-container {
    min-height: calc(100vh - 60px);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
