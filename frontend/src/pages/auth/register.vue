<template>
    <div class="container mx-auto">
        <p class="text-6xl font-black text-white">Register</p>
        <registerForm />
    </div>
</template>

<script>
import registerForm from '../../components/forms/register.vue'
export default {
    name: 'register',
    components: { registerForm },
}
</script>
