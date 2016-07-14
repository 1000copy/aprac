<template>
  <div class="jumbotron">
    <h1>Vue Time Tracker</h1>
    <img src="../assets/logo.png"/>
    <p>
      <strong>
        Get started by <a v-link="'/time-entries'">creating a time entry</a>.
      </strong>
    </p>  
  </div>
</template>
<style type="text/css" scoped>
h1{
	background: url('../assets/logo.png');
}
</style>