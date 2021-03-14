<template>
  <v-container>
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      type: 'month',
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
    }),
    methods: {
      async getEvents ({ start, end }) {
        const uploadEvents = [
          {name: 'Event Name', start: '2021-03-10 09:00', end: '2021-03-10 10:00', color: this.colors[0], timed: false}
        ];
        try{
          const res = await this.$axios.get('/events/')
          console.log(res.data);
          res.data.forEach(event => uploadEvents.push({
            name: event.event_name,
            start: event.start,
            end: event.end,
            color: event.color
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
            timed: event.timed
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