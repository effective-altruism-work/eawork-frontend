import { defineNuxtPlugin } from "#app";
import { addIcons } from "oh-vue-icons";
import { BiGithub, HiSolidExternalLink, RiExternalLinkLine, IoLocationOutline, BiThreeDots, HiSolidPlus, MdAddcircleoutlineRound  } from "oh-vue-icons/icons";
import { OiEye } from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(BiGithub, HiSolidExternalLink, RiExternalLinkLine, IoLocationOutline, BiThreeDots, HiSolidPlus, MdAddcircleoutlineRound, OiEye);
});
