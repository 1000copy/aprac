<template>
  <div id="wrapper">
    <img src="./assets/logo.png"></img>
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Vue Time Tracker
        </a>
        <ul class="nav navbar-nav">
          <li><a v-link="'/home'">Home</a></li>
          <li><a v-link="'/time-entries'">Time Entries</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-3">
        <sidebar :time="totalTime"></sidebar>    
      </div>
      <div class="col-sm-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: { 'sidebar': Sidebar },
    data () {
      return {
        // Start with the same value as our
        // first time entry. Hard-coded for now
        // because we'll use a different approach
        // in the next article anyway
        totalTime: 1.5
      }
    },
    events: {
      // Increment the totalTime value based on the new
      // time entry that is dispatched up
      timeUpdate (timeEntry) {
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      // Decrement totalTime when a time entry is deleted
      deleteTime (timeEntry) {
        this.totalTime -= parseFloat(timeEntry.totalTime)
      }
    }
  }
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
