<script setup lang="ts">
import { CFlex, CHeading, CButton, CBox } from "@chakra-ui/vue-next";
</script>
<template>
  <ais-pagination>
    <template
      v-slot="{
        currentRefinement,
        nbPages,
        pages,
        isFirstPage,
        isLastPage,
        refine,
        createURL
      }"
    >
      <CFlex gap="3">
        <CLink
          :href="createURL(0)"
          @click.prevent="refine(0)"
        >
          <CButton size="sm" :is-disabled="isFirstPage">‹‹</CButton>
        </CLink>
  
        <CLink
          :href="createURL(currentRefinement - 1)"
          @click.prevent="refine(currentRefinement - 1)"
        >
          <CButton size="sm" :is-disabled="isFirstPage">‹</CButton>
        </CLink>
  
        <CLink
          v-for="page in pages"
          :key="page"
          :href="createURL(page)"
          @click.prevent="refine(page)"
        >
          <CButton size="sm" :is-disabled="page === currentRefinement">{{ page + 1 }}</CButton>
        </CLink>
        
        <CLink
          :href="createURL(currentRefinement + 1)"
          @click.prevent="refine(currentRefinement + 1)"
        >
          <CButton size="sm" :is-disabled="isLastPage">›</CButton>
        </CLink>
  
        <CLink :href="createURL(nbPages)" @click.prevent="refine(nbPages)">
          <CButton size="sm" :is-disabled="isLastPage">››</CButton>
        </CLink>
      </CFlex>
      
    </template>
  </ais-pagination>
</template>
