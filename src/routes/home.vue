<template>
      <div>
            home
             <div v-for="item in homeInfo.list"  :key="item.title">
                        <div><h3>{{item.title}}</h3> </div>
                        <p>{{item.content}}</p>
             </div>
      </div>
</template>


<script>
export default {

      serverRequest(store) {

            return store.dispatch('getHomeInfo')

        },
      mounted() {

      },
      computed:{

          homeInfo(){

               return this.$store.state.homeInfo

          }


      }
}
</script>


<style scoped>

</style>
