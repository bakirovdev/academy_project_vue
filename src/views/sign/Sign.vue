<template>
    <v-container>
        <h2>this is a sign page . wellcome</h2>
        <v-divider></v-divider>
        <div>
            <v-row>
                <v-col cols="4">
                    <v-row>
                        <v-col cols="6">
                            <h4>Ismingiz</h4>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field/>
                        </v-col>
                        
                        <v-col cols="6">
                            <h4>Familyangiz</h4>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field/>
                        </v-col>

                        <v-col cols="6">
                            <h4>Telefon raqam</h4>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field/>
                        </v-col>

                        <v-col cols="6">
                            <h4>Tig'ilgan sana</h4>
                        </v-col>
                        <v-col cols="6">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="date"
                                    label="Birthday date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    :active-picker.sync="activePicker"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="save"
                                ></v-date-picker>
                                </v-menu>
                        </v-col>
                        
                        <v-col cols="6">
                            <h4>Jinsingiz</h4>
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete :items="items"></v-autocomplete>
                        </v-col>

                        <v-col cols="6">
                            <h4>Fan turi</h4>
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete :items="items"></v-autocomplete>
                        </v-col>

                        <v-col cols="6">
                            <h4>vaqti</h4>
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete :items="items"></v-autocomplete>
                        </v-col>

                        <v-col cols="6">
                            <h4>hafta</h4>
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete :items="items"></v-autocomplete>
                        </v-col>

                    </v-row>

                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>

export default {
  name: 'Home', 

  data () {
      return {
        activePicker: null,
        date: null,
        menu: false,
        items:['salom', 'hammaga']
      }
  },
  watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
};
</script>

<style src="../../styles/home.css">
</style>
