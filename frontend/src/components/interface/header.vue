<template>
    <nav class="bg-white py-2 md:py-4 fixed w-full top-0">
        <div class="container px-4 mx-auto md:flex md:items-center">
            <div class="flex justify-between items-center">
                <router-link to="/" class="font-bold text-xl text-indigo-600">Dynamic Models</router-link>
                <router-link
                    to="login"
                    class="
                        p-2
                        lg:px-4
                        md:mx-2
                        text-indigo-600 text-center
                        border border-transparent
                        rounded
                        hover:bg-indigo-100 hover:text-indigo-700
                        transition-colors
                        duration-300
                    "
                    >Login</router-link
                >
                <router-link
                    to="/register"
                    class="
                        p-2
                        lg:px-4
                        md:mx-2
                        text-indigo-600 text-center
                        border border-solid border-indigo-600
                        rounded
                        hover:bg-indigo-600 hover:text-white
                        transition-colors
                        duration-300
                        mt-1
                        md:mt-0 md:ml-1
                    "
                    >Signup</router-link
                >
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'header',
}
</script>

<style scoped></style>
