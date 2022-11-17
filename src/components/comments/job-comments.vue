<!-- <script lang="ts" setup>
import { useRuntimeConfig } from "#app";
import { captureEvent } from "@sentry/vue";
import axios from "axios";
import { onMounted, onUpdated, ref } from "vue";
import JobCommentChild from "~/components/job-comment-child.vue";
import JobCommentForm from "~/components/job-comment-form.vue";
import { Comment } from "~/utils/types";

const props = defineProps<{ jobPk: number | string; isShouldLoad: boolean }>();

const comments = ref(null);
const isNoComments = ref(false);
const config = useRuntimeConfig();

async function loadComments(args?: { isReload?: boolean }) {
  if ((props.isShouldLoad && !comments.value) || args?.isReload) {
    try {
      const res = await axios.get(`${config.public.apiBase}/comments/?post=${props.jobPk}`);
      const commentsRaw: Comment[] = res.data;
      comments.value = commentsRaw.filter((comment) => comment.parent === null);
    } catch (err) {
      captureEvent(err);
    }
  }
}

onMounted(loadComments);

onUpdated(loadComments);
</script> -->

<template>
  <!-- <div>
    <CText mt="10" font-size="lg" font-weight="bold" line-height="1">Comments</CText>

    <CBox mt="3" v-for="comment in comments" v-if="comments?.length" :key="comment.pk">
      <JobCommentChild
        :job-pk="props.jobPk"
        :comment="comment"
        @comment-posted="loadComments({ isReload: true })"
      />

      <CBox
        v-if="comment.children"
        v-for="commentChild1 in comment.children"
        :key="commentChild1.pk"
        ml="12"
      >
        <JobCommentChild
          :job-pk="props.jobPk"
          :comment="commentChild1"
          @comment-posted="loadComments({ isReload: true })"
        />

        <CBox
          v-if="commentChild1.children"
          v-for="commentChild2 in commentChild1.children"
          :key="commentChild2.pk"
          ml="12"
        >
          <JobCommentChild
            :job-pk="props.jobPk"
            :comment="commentChild2"
            :is-last-thread-level="true"
            @comment-posted="loadComments({ isReload: true })"
          />
        </CBox>
      </CBox>
    </CBox>

    <CBox v-if="isNoComments"> No comments yet </CBox>

    <CFlex gap="3" mt="6" direction="column">
      <CText :mt="isNoComments ? 0 : 6" font-size="lg" line-height="1"
        >Leave a comment</CText
      >
      <JobCommentForm
        :job-pk="props.jobPk"
        @comment-posted="loadComments({ isReload: true })"
      />
    </CFlex>
  </div> -->
</template>
