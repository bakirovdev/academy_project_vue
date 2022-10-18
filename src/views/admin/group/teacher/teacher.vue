<template>
    <v-dialog max-width="700px" v-model="dialog">
        <v-card>
            <v-card-title class="bg-info pa-3">
                <h3>GroupTeacher</h3>
            </v-card-title>
            <v-card-text class="pa-3">
                <v-data-table
                    dense
                    hide-default-footer
                    disable-pagination
                    disable-filtering
                    :headers="headers"
                    :items="data"
                >
                    <template #item.active ="{item}">
                        <v-switch
                            class="py-0 my-2"
                            hide-details
                            v-model="item.active"
                        ></v-switch>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'GroupTeacher',
    data(){
        return {
            dialog: false,
            headers: [
                {text: "Id", value: 'id'},
                {text: "Full Name", value: 'full_name'},
                {text: "Attached Date", value: 'date'},
                {text: "Active", value: 'active'},
            ],
            data: []
        }
    },
    created(){

    },
    computed: {

    },
    methods: {
        show(data){
            this.dialog = true
            this.data = data
        }
    }
}
</script>