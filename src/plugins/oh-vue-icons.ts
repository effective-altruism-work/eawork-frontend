import { defineNuxtPlugin } from "#app";
import { addIcons } from "oh-vue-icons";
import { BiGithub, HiSolidExternalLink, RiExternalLinkLine, IoLocationOutline, BiThreeDots, HiSolidPlus, MdAddcircleoutlineRound, HiChevronDown } from "oh-vue-icons/icons";
import { RiArrowDownSFill } from "oh-vue-icons/icons";
import { OiEye } from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(BiGithub, RiArrowDownSFill, HiSolidExternalLink, RiExternalLinkLine, IoLocationOutline, BiThreeDots, HiSolidPlus, MdAddcircleoutlineRound, OiEye, HiChevronDown);
});
