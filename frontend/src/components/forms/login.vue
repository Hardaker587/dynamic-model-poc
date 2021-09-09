<template>
    <form class="m-4">
        <div class="grid grid-cols-1 gap-4">
            <div class="flex flex-col items-start">
                <label class="text-white font-bold" for="email">Email</label>
                <input
                    v-model="user.email"
                    name="email"
                    id="email"
                    type="email"
                    class="rounded w-full"
                />
            </div>
            <div class="flex flex-col items-start">
                <label class="text-white font-bold" for="password"
                    >Password</label
                >
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
                "
                @click="loginUser()"
            >
                Login to Account
            </button>
        </div>
    </form>
</template>

<script>
import { inject } from 'vue'

export default {
    name: 'loginForm',
    data: () => ({
        user: {
            email: '',
            password: '',
        },
    }),
    methods: {
        async loginUser() {
            try {
                await this.$authentication_api.login(this.user)
            } catch (e) {
                console.error(e)
            }
        },
    },
}
</script>
