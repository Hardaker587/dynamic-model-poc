<template>
    <div class="container mx-auto">
        <p class="text-6xl font-black">Dynamic Model POC</p>
        <router-link to="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">Login</router-link>
        <router-link to="/register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">Register</router-link>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>