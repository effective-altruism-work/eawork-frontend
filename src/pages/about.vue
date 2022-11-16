<script setup lang="ts">
import { useHead } from "#app";
import { addIcons } from "oh-vue-icons";
import { BiGithub } from "oh-vue-icons/icons";

addIcons(BiGithub);

useHead({ title: "About" });
</script>

<template>
  <div class="max-w-2xl">
    <p class="mt-1">
      This is an MVP of a job board that daily imports
      <a href="https://80000hours.org/job-board/">80'000 Hours jobs board</a>, adds extra
      tags (eg Software Engineering) and allows to subscribe to a fine-tuned search query.
    </p>
    <p class="mt-1">
      The source code can be found at
      <a href="https://github.com/orgs/effective-altruism-work/repositories/">GitHub</a>.
    </p>
    <p class="mt-1">Features:</p>
    <ul>
      <li>80k import + possibility to post full details</li>
      <li>Customizable email alerts</li>
      <li>Job posts versioning (for managing multiple edit proposals)</li>
      <li>
        Extra fields + stackoverflow-like tagging system (salary, skills, workload type,
        generic tagging, etc)
      </li>
    </ul>
    <p class="mt-1">
      For inquires please feel free to reach out to
      <a href="mailto:support@eawork.org">support@eawork.org</a>.
    </p>
  </div>
</template>
