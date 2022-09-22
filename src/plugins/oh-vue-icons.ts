import { defineNuxtPlugin } from "#app";
import { addIcons } from "oh-vue-icons";
import {
  BiGithub,
  HiSolidExternalLink,
  MdStarrateRound,
  BiQuestionCircleFill,
  RiExternalLinkLine,
  FaMapMarkerAlt,
  IoLocationOutline,
  BiThreeDots,
  HiSolidPlus,
  MdAddcircleoutlineRound,
  HiChevronDown,
  RiArrowDownSFill,
  OiEye,
  MdFilterlistRound,
  IoClose,
  IoMenu,
  MdAddalertRound,
} from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(
    BiGithub,
    HiSolidExternalLink,
    MdStarrateRound,
    BiQuestionCircleFill,
    RiExternalLinkLine,
    FaMapMarkerAlt,
    IoLocationOutline,
    BiThreeDots,
    HiSolidPlus,
    MdAddcircleoutlineRound,
    HiChevronDown,
    RiArrowDownSFill,
    OiEye,
    MdFilterlistRound,
    IoClose,
    IoMenu,
    MdAddalertRound,
  );
});
