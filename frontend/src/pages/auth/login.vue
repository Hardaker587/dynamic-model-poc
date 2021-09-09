<template>
    <div class="container mx-auto">
        <p class="text-6xl font-black text-white">Login</p>
        <loginForm />
    </div>
</template>

<script>
import loginForm from '../../components/forms/login.vue'
export default {
    name: 'login',
    components: { loginForm },
}
</script>
