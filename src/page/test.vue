<template>
    <section>

        <button v-on:click="modifyRouter">erewrwer </button>
    </section>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        modifyRouter(){
            console.log(this.$router.options.routes.push({aaa:11}))
            console.log(this.$router.options.routes)
        }
    }
}
</script>

