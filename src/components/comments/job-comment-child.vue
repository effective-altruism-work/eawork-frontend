<!-- <script lang="ts" setup>
import { formatDistance } from "date-fns";
import { ref } from "vue";
import JobCommentForm from "~/components/job-comment-form.vue";
import { Comment } from "~/utils/types";

const props = defineProps<{
  jobPk: number | string;
  comment: Comment;
  isLastThreadLevel?: true;
}>();

const state = {
  isEditorVisible: ref(false),
};

const emit = defineEmits<{
  (event: "commentPosted"): void;
}>();

function formatDate(date: string) {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

function onCommentPosted() {
  state.isEditorVisible.value = false;
  emit("commentPosted");
}
</script> -->

<template>
  <CBox class="comment">
    <!-- <CBox bg="#f3f6fa" border-radius="md" p="3" py="2" mt="3">
      <CFlex align="center" gap="3">
        <CText color="gray.500" font-size="sm">{{ comment.author.first_name }}</CText>
      </CFlex>
      <CBox mt="0.5" v-html="comment.content" />
    </CBox>

    <CFlex align="center" gap="3" pl="3" mt="0.5">
      <CButton
        @click="state.isEditorVisible.value = true"
        variant="link"
        size="sm"
        color-scheme="gray"
      >
        Reply
      </CButton>
      <CBox w="3px" h="3px" mt="5px" bg="gray.300" border-radius="100%" />
      <CText color="gray.400" font-size="xs" mt="1">{{
        formatDate(comment.created_at)
      }}</CText>
    </CFlex>

    <CBox mt="3" v-if="state.isEditorVisible.value" pl="3" class="comment-form">
      <JobCommentForm
        :job-pk="props.jobPk"
        :comment-parent-pk="props.isLastThreadLevel ? comment.parent : comment.pk"
        :is-cancel-btn-visible="true"
        @cancel-clicked="state.isEditorVisible.value = false"
        @comment-posted="onCommentPosted"
      />
    </CBox> -->
  </CBox>
</template>
