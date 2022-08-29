<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CText } from "@chakra-ui/vue-next";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{ job: JobAlgolia }>();

</script>

<template>
  <CBox>
    <CFlex v-if="props.job.tags_skill.length" gap="3" mt="3" mb="-1">
      <CFlex
        v-for="skill in props.job.tags_skill"
        :key="skill"
        px="2"
        bg="gray.100"
        color="blue.900"
        font-size="xs"
        border-radius="md"
      >
        {{ skill }}
      </CFlex>
    </CFlex>

    <CFlex v-if="props.job.experience_avg || props.job.experience_min" gap="3" mt="3" mb="-1">
      <CFlex
        px="2"
        bg="gray.100"
        color="blue.900"
        font-size="xs"
        border-radius="md"
      >
        {{ props.job.experience_min }}
        <span v-if="props.job.experience_avg">-{{ props.job.experience_avg }}y of experience</span>
        <span v-else>+ years of experience</span>
      </CFlex>
    </CFlex>
  </CBox>
</template>
