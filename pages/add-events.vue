<template>
    <v-app>
        <v-container>
            <h4>Create Event</h4>
            <v-form ref='eventform' v-model="valid" lazy-validation>
                <v-text-field v-model="name" label="Event Name"></v-text-field>
                <v-menu v-model="menu1" 
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="dateRangeText"
                        label="Select Date"
                        persistent-hint
                        readonly
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        range
                    ></v-date-picker>
                </v-menu>
                <v-row>
                    <v-col cols="6">
                        <v-dialog
                            ref="dialog1"
                            v-model="startDialog"
                            :return-value.sync="startTime"
                            persistent
                            width="290px"
                        >
                            <template v-slot:activator="{on, attrs}">
                                <v-text-field
                                    v-model="startTime"
                                    label="Start Time"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                </v-text-field>
                            </template>
                            <v-time-picker
                                v-if="startDialog"
                                v-model="startTime"
                                full-width
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="startDialog = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog1.save(startTime)"
                                >
                                    OK
                                </v-btn>
                            </v-time-picker>
                        </v-dialog>
                    </v-col>
                    <v-col cols="6">
                        <v-dialog
                            ref="dialog2"
                            v-model="endDialog"
                            :return-value.sync="endTime"
                            persistent
                            width="290px"
                        >
                            <template v-slot:activator="{on, attrs}">
                                <v-text-field
                                    v-model="endTime"
                                    label="End Time"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                </v-text-field>
                            </template>
                            <v-time-picker
                                v-if="endDialog"
                                v-model="endTime"
                                full-width
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="endDialog = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog2.save(endTime)"
                                >
                                    OK
                                </v-btn>
                            </v-time-picker>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-row class="colorpicker justify-center align-center">
                    <v-btn-toggle mandatory v-model="colorSelected">
                        <v-btn>
                            <v-icon large color="#e55039">mdi-square-rounded</v-icon>
                        </v-btn>
                        <v-btn>
                            <v-icon large color="#1e3799">mdi-square-rounded</v-icon>
                        </v-btn>
                        <v-btn>
                            <v-icon large color="#079992">mdi-square-rounded</v-icon>
                        </v-btn>
                        <v-btn>
                            <v-icon large color="#e58e26">mdi-square-rounded</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </v-row>
                <v-row class="justify-center mt-12">
                    <v-btn @click="submit" dark :color="colors[colorSelected]" class="px-12">Create</v-btn>
                </v-row>
                
            </v-form>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: "addevent",
    data(){
        return{
            name: '',
            valid: true,
            menu1: false,
            date: [new Date().toISOString().substr(0, 10)],
            startDialog: false,
            startTime: null,
            endDialog: false,
            endTime: null,
            colorSelected: undefined,
            colors: ['#e55039', '#1e3799', '#079992', '#e58e26']
        }
    },
    computed: {
        dateRangeText () {
            return this.date.join(' ~ ')
        },
    },
    methods: {
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        async submit(){
            const data = {
                event_name: this.name,
                start: `${this.date[0]} ${this.startTime}`,
                end: `${this.date[1]} ${this.endTime}`,
                color: this.colors[this.colorSelected]
            }
            let config = {
                headers: {
                    Authorization: "Bearer " + this.$store.getters.getToken.token,
                },
            };
            console.log(data);
            try {
                const res = await this.$axios.post('/events/edit', data, config);
                console.log(res.data);
            } catch (error) {
                
            }
        }
    }

}
</script>

<style>

</style>