<script lang="ts" setup>
import BalloonBlockEditor from "@ckeditor/ckeditor5-build-balloon-block";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { ref, computed } from "vue";

const props = defineProps<{
  modelValue: string;
  toolbarItems?: string[];
  height?: string;
}>();

const CKEditorVue = CKEditor.component;
const editor = ref(BalloonBlockEditor);

const editorConfig = ref({
  toolbar: props.toolbarItems ?? [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "insertTable",
    "|",
    "undo",
    "redo",
  ],
});
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <CKEditorVue
    :editor="editor"
    v-model="value"
    :config="editorConfig"
    :style="{ 'min-height': props.height === 'lg' ? '172px' : 'initial' }"
  />
</template>

<style lang="scss">
:root {
  --ck-resizer-border-radius: var(--radii-md);
  --ck-color-base-border: var(--colors-gray-200);
  --ck-color-base-foreground: var(--colors-gray-50);
}

.ck.ck-toolbar.ck-toolbar_grouping {
  border-radius: var(--radii-md) !important;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.ck.ck-content.ck-editor__editable {
  border-radius: var(--radii-md) !important;
  border: 1px solid var(--colors-gray-200);
}

.ck-content {
  h2 {
    font-size: 1.8rem;
    font-weight: bold;
  }
  h3 {
    font-size: 1.35rem;
    font-weight: bold;
  }
  h4 {
    font-size: 1.1rem;
    font-weight: bold;
  }
  ul,
  menu,
  dir {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
  }

  li {
    display: list-item;
    text-align: match-parent;
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  a {
    color: var(--colors-blue-500);
    cursor: pointer;
  }
}

/*
 * CKEditor 5 (v35.0.1) content styles.
 * Generated on Wed, 24 Aug 2022 08:27:49 GMT.
 * For more information, check out https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/content-styles.html
 */

:root {
  --ck-color-base-active: hsl(208, 88%, 52%);
  --ck-color-image-caption-background: hsl(0, 0%, 97%);
  --ck-color-image-caption-text: hsl(0, 0%, 20%);
  --ck-color-mention-background: hsla(341, 100%, 30%, 0.1);
  --ck-color-mention-text: hsl(341, 100%, 30%);
  --ck-color-table-caption-background: hsl(0, 0%, 97%);
  --ck-color-table-caption-text: hsl(0, 0%, 20%);
  --ck-color-table-column-resizer-hover: var(--ck-color-base-active);
  --ck-highlight-marker-blue: hsl(201, 97%, 72%);
  --ck-highlight-marker-green: hsl(120, 93%, 68%);
  --ck-highlight-marker-pink: hsl(345, 96%, 73%);
  --ck-highlight-marker-yellow: hsl(60, 97%, 73%);
  --ck-highlight-pen-green: hsl(112, 100%, 27%);
  --ck-highlight-pen-red: hsl(0, 85%, 49%);
  --ck-image-style-spacing: 1.5em;
  --ck-inline-image-style-spacing: calc(var(--ck-image-style-spacing) / 2);
  --ck-table-column-resizer-position-offset: calc(
    var(--ck-table-column-resizer-width) * -0.5 - 0.5px
  );
  --ck-table-column-resizer-width: 7px;
  --ck-todo-list-checkmark-size: 16px;
  --ck-z-default: 1;
}
/* ckeditor5-block-quote/theme/blockquote.css */
.ck-content blockquote {
  overflow: hidden;
  padding-right: 1.5em;
  padding-left: 1.5em;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  border-left: solid 5px hsl(0, 0%, 80%);
}
/* ckeditor5-block-quote/theme/blockquote.css */
.ck-content[dir="rtl"] blockquote {
  border-left: 0;
  border-right: solid 5px hsl(0, 0%, 80%);
}
/* ckeditor5-image/theme/imagecaption.css */
.ck-content .image > figcaption {
  display: table-caption;
  caption-side: bottom;
  word-break: break-word;
  color: var(--ck-color-image-caption-text);
  background-color: var(--ck-color-image-caption-background);
  padding: 0.6em;
  font-size: 0.75em;
  outline-offset: -1px;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image {
  display: table;
  clear: both;
  text-align: center;
  margin: 0.9em auto;
  min-width: 50px;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  min-width: 100%;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image-inline {
  /*
     * Normally, the .image-inline would have "display: inline-block" and "img { width: 100% }" (to follow the wrapper while resizing).;
     * Unfortunately, together with "srcset", it gets automatically stretched up to the width of the editing root.
     * This strange behavior does not happen with inline-flex.
     */
  display: inline-flex;
  max-width: 100%;
  align-items: flex-start;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image-inline picture {
  display: flex;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image-inline picture,
.ck-content .image-inline img {
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 100%;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized {
  max-width: 100%;
  display: block;
  box-sizing: border-box;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized img {
  width: 100%;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized > figcaption {
  display: block;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-block-align-left,
.ck-content .image-style-block-align-right {
  max-width: calc(100% - var(--ck-image-style-spacing));
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-left,
.ck-content .image-style-align-right {
  clear: none;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-side {
  float: right;
  margin-left: var(--ck-image-style-spacing);
  max-width: 50%;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-left {
  float: left;
  margin-right: var(--ck-image-style-spacing);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-center {
  margin-left: auto;
  margin-right: auto;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-right {
  float: right;
  margin-left: var(--ck-image-style-spacing);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-block-align-right {
  margin-right: 0;
  margin-left: auto;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-block-align-left {
  margin-left: 0;
  margin-right: auto;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content p + .image-style-align-left,
.ck-content p + .image-style-align-right,
.ck-content p + .image-style-side {
  margin-top: 0;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-inline.image-style-align-left,
.ck-content .image-inline.image-style-align-right {
  margin-top: var(--ck-inline-image-style-spacing);
  margin-bottom: var(--ck-inline-image-style-spacing);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-inline.image-style-align-left {
  margin-right: var(--ck-inline-image-style-spacing);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-inline.image-style-align-right {
  margin-left: var(--ck-inline-image-style-spacing);
}
/* ckeditor5-media-embed/theme/mediaembed.css */
.ck-content .media {
  clear: both;
  margin: 0.9em 0;
  display: block;
  min-width: 15em;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table {
  margin: 0.9em auto;
  display: table;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  height: 100%;
  border: 1px double hsl(0, 0%, 70%);
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table td,
.ck-content .table table th {
  min-width: 2em;
  padding: 0.4em;
  border: 1px solid hsl(0, 0%, 75%);
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table th {
  font-weight: bold;
  background: hsla(0, 0%, 0%, 5%);
}
/* ckeditor5-table/theme/table.css */
.ck-content[dir="rtl"] .table th {
  text-align: right;
}
/* ckeditor5-table/theme/table.css */
.ck-content[dir="ltr"] .table th {
  text-align: left;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table table {
  overflow: hidden;
  table-layout: fixed;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table td,
.ck-content .table th {
  position: relative;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table .table-column-resizer {
  position: absolute;
  top: -999999px;
  bottom: -999999px;
  right: var(--ck-table-column-resizer-position-offset);
  width: var(--ck-table-column-resizer-width);
  cursor: col-resize;
  user-select: none;
  z-index: var(--ck-z-default);
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table[draggable] .table-column-resizer {
  display: none;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table .table-column-resizer:hover,
.ck-content .table .table-column-resizer__active {
  background-color: var(--ck-color-table-column-resizer-hover);
  opacity: 0.25;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content[dir="rtl"] .table .table-column-resizer {
  left: var(--ck-table-column-resizer-position-offset);
  right: unset;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content.ck-read-only .table .table-column-resizer {
  display: none;
}
/* ckeditor5-table/theme/tablecaption.css */
.ck-content .table > figcaption {
  display: table-caption;
  caption-side: top;
  word-break: break-word;
  text-align: center;
  color: var(--ck-color-table-caption-text);
  background-color: var(--ck-color-table-caption-background);
  padding: 0.6em;
  font-size: 0.75em;
  outline-offset: -1px;
}
/* ckeditor5-horizontal-line/theme/horizontalline.css */
.ck-content hr {
  margin: 15px 0;
  height: 4px;
  background: hsl(0, 0%, 87%);
  border: 0;
}
</style>
