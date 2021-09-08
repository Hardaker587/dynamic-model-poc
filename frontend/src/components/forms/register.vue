<template>
    <form class="m-4">
        <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col items-start">
                <label for="email">Email</label>
                <input
                    v-model="user.email"
                    name="email"
                    id="email"
                    type="email"
                    class="rounded w-full"
                />
            </div>
            <div class="flex flex-col items-start">
                <label for="password">Password</label>
                <input
                    v-model="user.password"
                    id="password"
                    name="password"
                    type="password"
                    class="rounded w-full"
                />
            </div>

            <button
                type="button"
                class="
                    bg-blue-500
                    hover:bg-blue-700
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded
                    mx-2
                "
                @click="registerUser()"
            >
                Register Account
            </button>
        </div>
    </form>
</template>

<script>
import { inject } from 'vue'

export default {
    name: 'registerForm',
    data: () => ({
        user: {
            email: '',
            password: '',
        },
    }),
    methods: {
        async registerUser() {
            console.log(import.meta.env.VITE_BASE_URL)
            try {
                await this.$user_api.apiUserPost({ user: this.user })
            } catch (e) {
                console.error(e)
            }
        },
    },
}
</script>
