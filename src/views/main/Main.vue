<template>
    <v-container  fluid class="ma-0 pa-0">
        <div class="bg-aqua">
            <div class="header">
                <v-row >
                    <v-col cols="5" class="">
                        <div class="logo-div  d-flex">
                            <img class="logo" elevation="20" src="../../assets/logo/logo.jpg" alt="">
                        </div>
                    </v-col>    
                    <v-spacer></v-spacer>
                    <v-col cols="3" order="last d-flex">
                       <div>
                           <div class="navigation">
                                <v-tabs fixed-tabs>
                                    <v-btn to="/"><v-icon>mdi-home</v-icon>Home</v-btn>
                                    <v-btn to="/sign">Sign in</v-btn>
                                </v-tabs>
                           </div>
                       </div>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div>
            <v-app>
                <router-view/>
            </v-app>
        </div>
    </v-container>
</template>
<script>

export default {
  name: 'Home', 

  data: () => ({
    //
  }),
};
</script>

<style src="../../styles/home.css">
</style>
