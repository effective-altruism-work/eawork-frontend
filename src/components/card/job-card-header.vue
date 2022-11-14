<script setup lang="ts"></script>
<template>
  <CFlex ml="3" justify="center" direction="column" gap="3">
    <CText font-weight="bold" :line-height="[1.3, null, 'none']" :font-size="{ lg: 'xl' }">
      <span v-if="props.isMissingAlgoliaContext">{{ job.title }}</span>
      <ais-snippet v-else :hit="job" attribute="title" />
    </CText>

    <CText
      :line-height="[1.3, null, 'none']"
      position="relative"
      :left="job?.company_is_recommended_org ? '-3px' : ''"
      :font-size="{ base: 'sm', lg: 'md' }"
    >
      <CBox
        v-if="job?.company_is_recommended_org"
        @mouseover="state.isStarHovering.value = true"
        @focus="state.isStarHovering.value = true"
        @mouseleave="state.isStarHovering.value = false"
        @blur="state.isStarHovering.value = false"
        position="relative"
        display="inline"
      >
        <OhVueIcon
          name="md-starrate-round"
          scale="1.1"
          style="margin-bottom: 1px; color: #9badb6; margin-right: 2px"
        />
        <JobHoverText v-if="state.isStarHovering.value" :companyName="job.company_name" />
      </CBox>
      <!-- huh -->
      <span v-if="props.isMissingAlgoliaContext">{{ job.company_name }}</span>
      <ais-snippet v-else :hit="job" attribute="company_name" />
    </CText>
  </CFlex>
</template>
