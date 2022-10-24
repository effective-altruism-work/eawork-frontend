<script setup lang="ts">
import { CFlex, CBox, CText } from "@chakra-ui/vue-next";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{ job: JobAlgolia }>();
</script>

<template>
  <CBox>
    <CFlex w="100%" gap="3" mt="3" wrap="wrap">
      <CFlex
        v-for="area in props.job.tags_area"
        :key="area"
        direction="column"
        gap="3"
        bg="#F3FAF0"
        px="2"
        font-size="sm"
        border-radius="4px"
      >
        <CText color="#466E35">{{
          area === "Other (pressing)" ? "Climate change" : area
        }}</CText>
      </CFlex>

      <!--        <CFlex-->
      <!--          v-for="workload in props.job.tags_workload"-->
      <!--          :key="workload"-->
      <!--          direction="column"-->
      <!--          gap="3"-->
      <!--          bg="#fbf6ed"-->
      <!--          px="2"-->
      <!--          font-size="sm"-->
      <!--        >-->
      <!--          <CText color="#98702e">{{ workload }}</CText>-->
      <!--        </CFlex>-->

      <CFlex
        v-for="exp in props.job.tags_exp_required"
        :key="exp"
        direction="column"
        gap="3"
        bg="#EEF1FE"
        px="2"
        font-size="sm"
        border-radius="4px"
      >
        <CText color="#202C58">{{ exp }}</CText>
      </CFlex>

      <!--        <CFlex-->
      <!--          v-for="location in props.job.tags_location_type"-->
      <!--          :key="location"-->
      <!--          direction="column"-->
      <!--          gap="3"-->
      <!--          bg="#EBF7F4"-->
      <!--          px="2"-->
      <!--          font-size="sm"-->
      <!--        >-->
      <!--          <CText color="#0E6D6F">{{ location }}</CText>-->
      <!--        </CFlex>-->
    </CFlex>

    <CFlex v-if="props.job.tags_skill.length" gap="3" mt="3" mb="-1" wrap="wrap">
      <CFlex
        v-for="skill in props.job.tags_skill"
        :key="skill"
        px="2"
        bg="gray.50"
        color="blue.900"
      >
        {{ skill }}
      </CFlex>
    </CFlex>
  </CBox>
</template>
