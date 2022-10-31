<script setup lang="ts">
import { chakra, CFlex, CVStack, CLink, CBox, CText, CHeading } from "@chakra-ui/vue-next";
import FooterImageLink from "./footer-image-link.vue";
</script>

<template>
  <chakra.footer
    id="footer"
    color="lightest-gray"
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
    role="contentinfo"
  >
    <CFlex
      w="100%"
      justify-content="center"
      align-items="center"
      background-color="dark-gray"
      py="10"
    >
      <CFlex
        justify-content="center"
        align-items="center"
        flex-direction="column"
        max-w="1050px"
      >
        <CFlex mb="4" font-size="17.5px" w="100%" class="navigation-footer">
          <CBox
            background-color="mid-gray"
            p="4"
            rounded="lg"
            w="100%"
            mb="4"
            class="bg-gray-dark border-radius-small padding-left padding-right"
          >
            <CFlex w="100%" justify-content="between" class="list-no-bullet">
              <CBox pr="12" w="33.3%" class="col-xxs-12 col-xs-6 col-sm-4">
                <CHeading font-size="lg" color="light-gray">Our research</CHeading>
                <chakra.ul color="lightest-gray">
                  <li><a href="/key-ideas/">Overview: Key ideas</a></li>
                  <li>
                    <a href="/problem-profiles/">Especially pressing world problems</a>
                  </li>
                  <li><a href="/key-ideas/#effective-altruism">Effective altruism</a></li>
                  <li><a href="/articles/future-generations/">Future generations</a></li>
                  <li><a href="/career-reviews/">List of careers</a></li>
                  <li><a href="/career-guide/">Career guide (2017)</a></li>
                  <li><a href="/research/">All our research</a></li>
                </chakra.ul>
              </CBox>
              <CBox w="33.3%" pr="12" class="col-xxs-12 col-xs-6 col-sm-4">
                <CHeading font-size="lg" color="light-gray">Take action</CHeading>
                <chakra.ul color="lightest-gray">
                  <li><a href="/career-planning/">Plan your career</a></li>
                  <li><a href="/job-board/">Find a job</a></li>
                  <li>
                    <a href="/advising/?int_campaign=2021-04__footer-navigation"
                      >Get 1-1 advice</a
                    >
                  </li>
                  <li><a href="/community/">Join our community</a></li>
                </chakra.ul>
                <CHeading font-size="lg" color="light-gray">Follow us</CHeading>
                <chakra.ul color="lightest-gray">
                  <li><a href="/podcast/">Subscribe to our podcast</a></li>
                  <li><a href="/newsletter/">Join our newsletter</a></li>
                  <li><a href="https://twitter.com/80000hours">Follow us on Twitter</a></li>
                  <li>
                    <a href="https://www.linkedin.com/groups/5057625/"
                      >Join our LinkedIn group</a
                    >
                  </li>
                  <li>
                    <a href="https://www.facebook.com/80000Hours/">Follow us on Facebook</a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/user/eightythousandhours"
                      >Follow us on YouTube</a
                    >
                  </li>
                </chakra.ul>
              </CBox>
              <CBox pr="12" w="33.3%" class="col-xxs-12 col-xs-6 col-sm-4">
                <CHeading font-size="lg" color="light-gray">About us</CHeading>
                <chakra.ul color="lightest-gray">
                  <li><a href="/about/">Why 80,000 Hours?</a></li>
                  <li><a href="/about/meet-the-team/">Meet the team</a></li>
                  <li><a href="/about/donors/">Our donors</a></li>
                  <li><a href="/about/media-coverage/">Media coverage</a></li>
                  <li>
                    <a href="/about/credibility/evaluations/mistakes/">Our mistakes</a>
                  </li>
                </chakra.ul>
              </CBox>
            </CFlex>
          </CBox>
        </CFlex>
        <CFlex color="light-gray" flex-wrap="nowrap">
          <CBox width="66%" pr="8" class="col-md-8">
            <CFlex mb="4">
              <CBox width="67%" pr="7">
                <CFlex mb="4" class="col-xxs-12 col-xxs-offset-0 col-md-7">
                  <FooterImageLink
                    href="https://www.ox.ac.uk/"
                    alt="Oxford-fb"
                    src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/university-of-oxford-logo.png"
                    src2="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/university-of-oxford-logo_2x.png"
                  />
                  <FooterImageLink
                    href="https://www.fhi.ox.ac.uk/"
                    alt="Future of Humanity Institute Logo"
                    src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/fhi-logo.png"
                    src2="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/fhi-logo_2x.png"
                  />

                  <FooterImageLink
                    href="https://globalprioritiesinstitute.org/"
                    alt="Global Priorities Institute Logo"
                    src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/gpi-logo.gif"
                    src2="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/gpi-logo_2x.gif"
                  />
                </CFlex>
                <CBox class="col-xxs-12 visible-xxs margin-bottom-small">
                  <CText font-size="13px" color="#8e9092" class="smallest">
                    We're affiliated with the Future of Humanity Institute and the Global
                    Priorities Institute at the University of Oxford.
                  </CText>
                </CBox>
              </CBox>
              <CBox width="33%">
                <CFlex mb="4" class="col-xxs-12 col-xxs-offset-0 col-md-5">
                  <FooterImageLink
                    href="https://centreforeffectivealtruism.org/"
                    alt="CEA
                  logo"
                    src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/cea-logo.png"
                    src2="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/cea-logo_2x.png"
                  />
                  <FooterImageLink
                    href="https://www.givingwhatwecan.org/"
                    alt="Giving What We Can logo"
                    src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/gwwc-logo.png"
                    src2="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/gwwc-logo_2x.png"
                  />
                </CFlex>

                <CBox class="col-md-5">
                  <CText font-size="13px" color="#8e9092">
                    We work closely with the Centre for Effective Altruism and Giving What We
                    Can.
                  </CText>
                </CBox>
              </CBox>
            </CFlex>
            <CFlex font-size="13px" class="row-about footer__about">
              <CBox class="col-sm-12">
                <p>
                  80,000 Hours is a project of the
                  <CLink is-external href="http://ev.org"
                    >Effective Ventures Foundation</CLink
                  >
                  (England and Wales registered charity number 1149828 and registered company
                  number 07962181) with a registered 501(c)(3) Exempt Organization in the USA
                  (Centre for Effective Altruism USA Inc., EIN 47-1988398).
                </p>
              </CBox>
            </CFlex>
          </CBox>
          <CBox width="33%" font-size="13px" class="col-md-4 smallest footer__disclaimer">
            <CText mb="4">
              Please <CLink is-external href="/about/contact/">contact us</CLink> to suggest
              ideas, improvements, or corrections.
            </CText>
            <CText mb="4">
              We do our best to provide useful information, but how you use the information
              is up to you. We don’t take responsibility for any loss that results from the
              use of information on the site. Please consult our&nbsp;<CLink
                is-external
                href="/legal/"
                >full legal disclaimer</CLink
              >
              and <CLink is-external href="/privacy-policy/">privacy policy</CLink>.
            </CText>
            <CText mb="4">
              © 2021 – all rights reserved. Please
              <CLink is-external href="/about/contact/">contact us</CLink> if you wish to
              redistribute, translate, or adapt this work.
            </CText>
          </CBox>
        </CFlex>
      </CFlex>
    </CFlex>
    <CFlex
      justify-content="center"
      align-items="center"
      py="30px"
      height="60px"
      box-sizing="content-box"
    >
      <CFlex gap="12">
        <CLink
          is-external
          href="https://www.economist.com/international/2018/05/31/to-help-save-the-world-become-a-banker-not-a-doctor"
          title="The Economist coverage of 80,000 Hours"
        >
          <noscript
            ><img
              alt="The Economist logo"
              width="71"
              height="36"
              src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo.gif?v=1"
              srcset="
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo.gif?v=1    1x,
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo_2x.gif?v=1 2x
              "
          /></noscript>
          <img
            class="lazyloaded"
            alt="The Economist logo"
            width="71"
            height="36"
            src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo.gif?v=1"
            data-src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo.gif?v=1"
            data-srcset="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo.gif?v=1 1x, https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo_2x.gif?v=1 2x"
            srcset="
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo.gif?v=1    1x,
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/economist-logo_2x.gif?v=1 2x
            "
          />
        </CLink>
        <CLink
          is-external
          href="https://www.ft.com/content/72d90f7a-3c20-11e5-8613-07d16aad2152"
          title="FT coverage of 80,000 Hours"
        >
          <noscript
            ><img
              alt="FT logo"
              width="98"
              height="36"
              src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo.gif?v=1"
              srcset="
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo.gif?v=1    1x,
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo_2x.gif?v=1 2x
              "
          /></noscript>
          <img
            class="lazyloaded"
            alt="FT logo"
            width="98"
            height="36"
            src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo.gif?v=1"
            data-src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo.gif?v=1"
            data-srcset="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo.gif?v=1 1x, https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo_2x.gif?v=1 2x"
            srcset="
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo.gif?v=1    1x,
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ft-logo_2x.gif?v=1 2x
            "
          />
        </CLink>
        <CLink
          is-external
          href="https://www.theguardian.com/world/2015/sep/22/extreme-altruism-should-you-care-for-strangers-as-much-as-family"
          title="The Guardian coverage of 80,000 Hours"
        >
          <noscript
            ><img
              alt="The Guardian logo"
              width="102"
              height="34"
              src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo.gif"
              srcset="
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo.gif    1x,
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo_2x.gif 2x
              "
          /></noscript>
          <img
            class="lazyloaded"
            alt="The Guardian logo"
            width="102"
            height="34"
            src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo.gif"
            data-src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo.gif"
            data-srcset="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo.gif 1x, https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo_2x.gif 2x"
            srcset="
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo.gif    1x,
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/guardian-logo_2x.gif 2x
            "
          />
        </CLink>
        <CLink
          is-external
          href="https://www.ted.com/talks/will_macaskill_what_are_the_most_important_moral_problems_of_our_time"
          title="TED coverage of 80,000 Hours"
        >
          <noscript
            ><img
              alt="TED logo"
              width="147"
              height="34"
              src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo.gif"
              srcset="
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo.gif    1x,
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo_2x.gif 2x
              "
          /></noscript>
          <img
            class="lazyloaded"
            alt="TED logo"
            width="147"
            height="34"
            src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo.gif"
            data-src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo.gif"
            data-srcset="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo.gif 1x, https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo_2x.gif 2x"
            srcset="
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo.gif    1x,
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/ted-logo_2x.gif 2x
            "
          />
        </CLink>
        <CLink
          is-external
          href="https://www.vox.com/future-perfect/2018/11/28/18114601/future-perfect-podcast-career-choice"
          title="Vox coverage of 80,000 Hours"
        >
          <noscript
            ><img
              alt="Vox logo"
              width="70"
              height="34"
              src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo.gif"
              srcset="
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo.gif    1x,
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo_2x.gif 2x
              "
          /></noscript>
          <img
            class="ls-is-cached lazyloaded"
            alt="Vox logo"
            width="70"
            height="34"
            src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo.gif"
            data-src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo.gif"
            data-srcset="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo.gif 1x, https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo_2x.gif 2x"
            srcset="
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo.gif    1x,
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo_2x.gif 2x
            "
          />
        </CLink>
        <CLink
          is-external
          href="https://blog.ycombinator.com/80-000-hours-yc-s15-helps-top-graduates-choose-careers-that-matter/"
          title="Y Combinator coverage of 80,000 Hours"
        >
          <noscript
            ><img
              alt="Y Combinator logo"
              width="141"
              height="34"
              src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo.gif"
              srcset="
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo.gif    1x,
                https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo_2x.gif 2x
              "
          /></noscript>
          <img
            class="ls-is-cached lazyloaded"
            alt="Y Combinator logo"
            width="141"
            height="34"
            src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo.gif"
            data-src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo.gif"
            data-srcset="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo.gif 1x, https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo_2x.gif 2x"
            srcset="
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo.gif    1x,
              https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/yc-logo_2x.gif 2x
            "
          />
        </CLink>
      </CFlex>
    </CFlex>
  </chakra.footer>
</template>
