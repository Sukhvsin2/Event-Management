<template>
  <v-container>
      <v-toolbar flat>
        <v-btn text @click="setToday">
          Today
        </v-btn>
        <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </v-toolbar>
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @click:event="showEvent"
        @change="getEvents"
      >
      </v-calendar>
        <v-dialog
            v-model="selectedOpen"
            persistent
            width="500px"
        >
            <v-card
              color="grey lighten-4"
              flat
            >
            <v-card-text>
              <v-card-title>
                <v-row align="center" justify="space-between" class="my-1">
                  {{dialogTitle}}
                  <v-btn :to="`/add-events?filter=true&name=${dialogTitle}&date=${timings}&id=${dialogId}&time=${time}`" v-if="login" icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                </v-row>
              </v-card-title>
              <v-card-subtitle>{{timings}}</v-card-subtitle>
            </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ml-auto"
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      selectedOpen: false,
      selectedElement: null,
      selectedEvent: {},
      type: 'month',
      focus: '',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Kuch bhi', 'Birthday', 'Conference', 'Party'],
      dialogTitle: 'Title Here',
      dialogDesc: 'Descr Here',
      timings: null,
      time: null,
      dialogColor: null,
      dialogId: null
    }),
    computed: {
      login(){
        return this.$store.getters.isAuthenticated.login
      }
    },
    methods: {
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      setToday () {
        this.focus = ''
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      formatDate(date){
        let d = date.split('-')
        return `${d[1]}-${d[2]}-${d[0]}`
      },
      showEvent ({ nativeEvent, event }) {
        this.dialogTitle = event.name
        if(event.start.split(' ')[0] === event.end.split(' ')[0]){
          this.timings = this.formatDate(event.start.split(' ')[0])
        }else{
          this.timings = this.formatDate(event.start.split(' ')[0]) + ' ~ ' + this.formatDate(event.end.split(' ')[0])
        }
        this.dialogColor = event.color
        this.time = `${event.start} ${event.end}`
        this.dialogId = event.id
        console.log(event);
        this.selectedOpen = true

        nativeEvent.stopPropagation()
      },
      async getEvents ({ start, end }) {
        const uploadEvents = [
          // {name: 'Event Name', start: '2021-03-10 09:00', end: '2021-03-10 10:00', color: this.colors[0]}
        ];
        try{
          const res = await this.$axios.get('/events/')
          console.log(res.data);
          res.data.forEach(event => uploadEvents.push({
            name: event.event_name,
            start: event.start,
            end: event.end,
            color: event.color,
            id: event.id
          }))
        } catch (error) {
          console.log(error);
        }

        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000

        
        uploadEvents.forEach(event => {
          events.push({
            name: event.name,
            start: event.start,
            end: event.end,
            color: event.color,
            // timed: event.timed,
            id: event.id
          })
        })
        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

<style>

</style>