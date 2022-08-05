<template>
    <v-container class="pa-0 ma-0" fluid>
        <div class="navbar">
            <v-tabs color="white accent-4 bg-dark" right background-color="transparent" class="pa-0 ma-0">
            <v-tab to="/admin/settings"><span class="white--text" >Course</span></v-tab>
            <v-tab to="/admin/settings/time"><span class="white--text">Time</span></v-tab>
            </v-tabs>
        </div>
        <router-view class="mt-15"></router-view>
    </v-container>
</template>
<script>
export default {
    name: 'SettingsPage'
}
</script>
<style>
</style>
