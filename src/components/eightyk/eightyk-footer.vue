<script setup lang="ts">
import FooterImageLink from "./footer-image-link.vue";
import FooterBoxLink from "./footer-box-link.vue";
import EightyKLink from "./eightyk-link.vue";
</script>

<template>
  <footer
    class="flex flex-col justify-center items-center bg-gray-lightest"
    id="footer"
    role="contentinfo"
  >
    <div class="flex w-full justify-center items-center bg-gray-dark py-5 lg:py-10">
      <div class="flex justify-center items-center flex-col w-full max-w-[1050px]">
        <div class="flex mb-4 text-[14.875px] lg:text-[17.5px] w-full">
          <div class="bg-gray-mid p-4 m-2 lg:m-0 rounded-lg w-full mb-4">
            <div class="flex w-full flex-col lg:flex-row justify-between">
              <div class="pr-0 lg:pr-12 w-full lg:w-1/3">
                <h3 class="lg:text-lg lg:leading-10 text-gray-light font-bold">
                  Our research
                </h3>
                <ul class="w-full text-gray-lightest">
                  <li>
                    <FooterBoxLink href="/key-ideas/">Overview: Key ideas</FooterBoxLink>
                  </li>
                  <li>
                    <FooterBoxLink href="/problem-profiles/"
                      >Especially pressing world problems</FooterBoxLink
                    >
                  </li>
                  <li>
                    <FooterBoxLink href="/key-ideas/#effective-altruism"
                      >Effective altruism</FooterBoxLink
                    >
                  </li>
                  <li>
                    <FooterBoxLink href="/articles/future-generations/"
                      >Future generations</FooterBoxLink
                    >
                  </li>
                  <li>
                    <FooterBoxLink href="/career-reviews/">List of careers</FooterBoxLink>
                  </li>
                  <li>
                    <FooterBoxLink href="/career-guide/">Career guide (2017)</FooterBoxLink>
                  </li>
                  <li><FooterBoxLink href="/research/">All our research</FooterBoxLink></li>
                </ul>
              </div>
              <div class="w-full lg:w-1/3 pr-0 lg:pr-12">
                <h3 class="mt-4 lg:mt-0 lg:text-lg lg:leading-10 text-gray-light font-bold">
                  Take action
                </h3>
                <ul class="w-full text-gray-lightest">
                  <li>
                    <FooterBoxLink href="/career-planning">Plan your career</FooterBoxLink>
                  </li>
                  <li><FooterBoxLink href="/job-board">Find a job</FooterBoxLink></li>
                  <li>
                    <FooterBoxLink href="/advising/?int_campaign=2021-04__footer-navigation"
                      >Get 1-1 advice</FooterBoxLink
                    >
                  </li>
                  <li>
                    <FooterBoxLink href="/community">Join our community</FooterBoxLink>
                  </li>
                </ul>
                <h3 class="mt-4 lg:mt-0 lg:text-lg text-gray-light font-bold lg:leading-10">
                  Follow us
                </h3>
                <ul class="w-full text-gray-lightest">
                  <li>
                    <FooterBoxLink href="/podcast">Subscribe to our podcast</FooterBoxLink>
                  </li>
                  <li>
                    <FooterBoxLink href="/newsletter">Join our newsletter</FooterBoxLink>
                  </li>
                  <li>
                    <FooterBoxLink external href="https://twitter.com/80000hours"
                      >Follow us on Twitter</FooterBoxLink
                    >
                  </li>
                  <li>
                    <FooterBoxLink external href="https://www.linkedin.com/groups/5057625/"
                      >Join our LinkedIn group</FooterBoxLink
                    >
                  </li>
                  <li>
                    <FooterBoxLink external href="https://www.facebook.com/80000Hours/"
                      >Follow us on Facebook</FooterBoxLink
                    >
                  </li>
                  <li>
                    <FooterBoxLink
                      external
                      href="https://www.youtube.com/user/eightythousandhours"
                      >Follow us on YouTube</FooterBoxLink
                    >
                  </li>
                </ul>
              </div>
              <div class="lg:pr-12 w-full lg:w-1/3">
                <h3 class="mt-4 lg:mt-0 lg:text-lg lg:leading-10 text-gray-light font-bold">
                  About us
                </h3>
                <ul class="text-gray-lightest">
                  <li><FooterBoxLink href="/about">Why 80,000 Hours?</FooterBoxLink></li>
                  <li>
                    <FooterBoxLink href="/about/meet-the-team">Meet the team</FooterBoxLink>
                  </li>
                  <li><FooterBoxLink href="/about/donors/">Our donors</FooterBoxLink></li>
                  <li>
                    <FooterBoxLink href="/about/media-coverage/"
                      >Media coverage</FooterBoxLink
                    >
                  </li>
                  <li>
                    <FooterBoxLink href="/about/credibility/evaluations/mistakes/"
                      >Our mistakes</FooterBoxLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex px-4 lg:px-0 text-gray-light text-[13px] flex-col lg:flex-row flex-nowrap"
        >
          <div class="w-full lg:w-2/3 pr-0 lg:pr-8">
            <div class="flex flex-col lg:flex-row mb-4">
              <div class="w-full lg-w-2/3 lg:pr-7 pb-4 lg:pb-0">
                <div class="flex mb-4">
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
                </div>
                <div>
                  <p class="text-[#8e9092]">
                    We're affiliated with the Future of Humanity Institute and the Global
                    Priorities Institute at the University of Oxford.
                  </p>
                </div>
              </div>
              <div class="w-full lg:w-1/3">
                <div class="flex mb-4">
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
                </div>

                <div>
                  <p class="text-[#9e9092]">
                    We work closely with the Centre for Effective Altruism and Giving What We
                    Can.
                  </p>
                </div>
              </div>
            </div>
            <div class="flex">
              <div>
                <p>
                  80,000 Hours is a project of the
                  <a href="http://ev.org">Effective Ventures Foundation</a>
                  (England and Wales registered charity number 1149828 and registered company
                  number 07962181) with a registered 501(c)(3) Exempt Organization in the USA
                  (Centre for Effective Altruism USA Inc., EIN 47-1988398).
                </p>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/3">
            <p class="mb-4">
              Please
              <EightyKLink path="/about/contact/">contact us</EightyKLink>
              to suggest ideas, improvements, or corrections.
            </p>
            <p class="mb-4">
              We do our best to provide useful information, but how you use the information
              is up to you. We don’t take responsibility for any loss that results from the
              use of information on the site. Please consult our&nbsp;<EightyKLink
                path="/legal"
                >full legal disclaimer</EightyKLink
              >
              and
              <EightyKLink path="/about/privacy-policy">privacy policy</EightyKLink>.
            </p>
            <p class="mb-4">
              © 2021 – all rights reserved. Please
              <EightyKLink path="/about/contact">contact us</EightyKLink>
              if you wish to redistribute, translate, or adapt this work.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-white">
      <div
        class="flex justify-center items-center py-[30px] px-2 lg:px-0 lg:h-[60px] box-content"
      >
        <div class="flex flex-wrap lg:flex-nowrap justify-center gap-8 lg:gap-12">
          <a
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
          </a>
          <a
            href="https://www.ft.com/content/72d90f7a-3c20-11e5-8613-07d16aad2152"
            title="FT coverage of 80,000 Hours"
          >
            <noscript
              ><img
                loading="lazy"
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
              loading="lazy"
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
          </a>
          <a
            href="https://www.theguardian.com/world/2015/sep/22/extreme-altruism-should-you-care-for-strangers-as-much-as-family"
            title="The Guardian coverage of 80,000 Hours"
          >
            <noscript
              ><img
                loading="lazy"
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
              loading="lazy"
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
          </a>
          <a
            href="https://www.ted.com/talks/will_macaskill_what_are_the_most_important_moral_problems_of_our_time"
            title="TED coverage of 80,000 Hours"
          >
            <noscript
              ><img
                loading="lazy"
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
              loading="lazy"
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
          </a>
          <a
            href="https://www.vox.com/future-perfect/2018/11/28/18114601/future-perfect-podcast-career-choice"
            title="Vox coverage of 80,000 Hours"
          >
            <noscript
              ><img
                alt="Vox logo"
                width="70"
                loading="lazy"
                height="34"
                src="https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo.gif"
                srcset="
                  https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo.gif    1x,
                  https://80000hours.org/wp-content/themes/80000hours/assets/img/footer/vox-logo_2x.gif 2x
                "
            /></noscript>
            <img
              loading="lazy"
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
          </a>
          <a
            href="https://blog.ycombinator.com/80-000-hours-yc-s15-helps-top-graduates-choose-careers-that-matter/"
            title="Y Combinator coverage of 80,000 Hours"
          >
            <noscript
              ><img
                loading="lazy"
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
              loading="lazy"
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
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
