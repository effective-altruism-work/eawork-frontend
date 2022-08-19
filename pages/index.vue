<script
  setup
  lang="ts"
>
const { data } = await useFetch("https://backend.eawork.org/api/jobs");
</script>

<template>
  <div>
    <h1>EA Work</h1>

    <ul>
      <li v-for="job in data">{{ job.title }}</li>
    </ul>
  </div>
</template>
