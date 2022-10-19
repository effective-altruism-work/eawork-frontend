/*!
 * @preserve
 * riveted.js | v0.6.1
 * Copyright (c) 2016 Rob Flaherty (@robflaherty)
 * Licensed under the MIT license
 */

import { tracking } from "./tracking";

/* Universal module definition */

class Riveted {
  started = false;
  stopped = false;
  turnedOff = false;
  clockTime = 0;
  startTime = 0;
  clockTimer = null;
  idleTimer = null;
  reportInterval = null;
  idleTimeout = null;
  nonInteraction = null;
  universalGA = null;
  classicGA = null;
  universalSendCommand = null;
  googleTagManager = null;
  gaGlobal = null;
  sendEvent:
    | null
    | ((secondsOnPage: number, nonInteraction: boolean, reportInterval: number) => void) =
    null;

  constructor() {
    this.startTime = new Date().getTime();
  }

  init = (options: {
    reportInterval?: number;
    idleTimeout?: number;
    eventHandler?: (
      secondsOnPage: number,
      nonInteraction: boolean,
      reportInterval: number,
    ) => void;
    gaGlobal?: string;
    gaTracker?: string;
    nonInteraction?: boolean;
    userTimingHandler?: () => void;
  }) => {
    // Set up options and defaults
    this.reportInterval = options?.reportInterval || 5;
    this.idleTimeout = options?.idleTimeout || 30;
    this.gaGlobal = options?.gaGlobal || "ga";
    /*
     * Determine which version of GA is being used
     * "ga", "_gaq", and "dataLayer" are the possible globals
     */

    if (typeof window[this.gaGlobal] === "function") {
      this.universalGA = true;
    }
    // if (typeof _gaq !== "undefined" && typeof _gaq.push === "function") {
    //   this.classicGA = true;
    // }

    // if (typeof dataLayer !== "undefined" && typeof dataLayer.push === "function") {
    //   this.googleTagManager = true;
    // }

    if ("gaTracker" in options && typeof options.gaTracker === "string") {
      this.universalSendCommand = options.gaTracker + ".send";
    } else {
      this.universalSendCommand = "send";
    }

    this.sendEvent =
      "eventHandler" in options ? options.eventHandler : this.defaultSendEvent;

    if (typeof options.userTimingHandler == "function") {
      this.sendUserTiming = options.userTimingHandler;
    }

    if (options?.nonInteraction === false) {
      this.nonInteraction = false;
    } else {
      this.nonInteraction = true;
    }
    // Basic activity event listeners
    this.addListener(document, "keydown", this.trigger);
    this.addListener(document, "click", this.trigger);
    this.addListener(window, "mousemove", this.throttle(this.trigger, 500));
    this.addListener(window, "scroll", this.throttle(this.trigger, 500));

    // Page visibility listeners
    this.addListener(document, "visibilitychange", this.visibilityChange);
    this.addListener(document, "webkitvisibilitychange", this.visibilityChange);
  };

  /*
   * Throttle function borrowed from:
   * Underscore.js 1.5.2
   * http://underscorejs.org
   * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   * Underscore may be freely distributed under the MIT license.
   */

  throttle = (func, wait) => {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    let later = function () {
      previous = new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
    };
    return function () {
      let now = new Date().getTime();
      if (!previous) previous = now;
      let remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  /*
   * Cross-browser event listening
   */

  addListener = (element, eventName, handler) => {
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, handler);
    } else {
      element["on" + eventName] = handler;
    }
  };

  /*
   * Function for logging User Timing event on initial interaction
   */

  sendUserTiming = (timingValue) => {
    if (this.googleTagManager) {
      //   dataLayer.push({
      //     event: "RivetedTiming",
      //     eventCategory: "Riveted",
      //     timingVar: "First Interaction",
      //     timingValue: timingValue,
      //   });
    } else {
      if (this.universalGA) {
        window[this.gaGlobal](
          this.universalSendCommand,
          "timing",
          "Riveted",
          "First Interaction",
          timingValue,
        );
      }

      if (this.classicGA) {
        // _gaq.push(["_trackTiming", "Riveted", "First Interaction", timingValue, null, 100]);
      }
    }
  };

  /*
   * Function for logging ping events
   */

  defaultSendEvent = (
    secondsOnPage: number,
    nonInteraction: boolean,
    reportInterval: number,
  ) => {
    if (this.googleTagManager) {
      //   dataLayer.push({
      //     event: "Riveted",
      //     eventCategory: "Riveted",
      //     eventAction: "Time Spent",
      //     eventLabel: time,
      //     eventValue: this.reportInterval,
      //     eventNonInteraction: this.nonInteraction,
      //   });
    } else {
      if (this.universalGA) {
        // window[this.gaGlobal](
        //   this.universalSendCommand,
        //   "event",
        //   "Riveted",
        //   "Time Spent",
        //   time.toString(),
        //   this.reportInterval,
        //   { nonInteraction: this.nonInteraction },
        // );
      }

      if (this.classicGA) {
        // _gaq.push([
        //   "_trackEvent",
        //   "Riveted",
        //   "Time Spent",
        //   time.toString(),
        //   this.reportInterval,
        //   this.nonInteraction,
        // ]);
      }
    }
  };

  setIdle = () => {
    clearTimeout(this.idleTimer);
    this.stopClock();
  };

  visibilityChange = () => {
    if (document?.hidden) {
      this.setIdle();
    }
  };

  clock = () => {
    this.clockTime += 1;
    if (this.clockTime > 0 && this.clockTime % this.reportInterval === 0) {
      this.sendEvent(this.clockTime, this.nonInteraction, this.reportInterval);
    }
  };

  stopClock = () => {
    this.stopped = true;
    clearInterval(this.clockTimer);
  };

  turnOff = () => {
    this.setIdle();
    this.turnedOff = true;
  };

  turnOn = () => {
    this.turnedOff = false;
  };

  restartClock = () => {
    this.stopped = false;
    clearInterval(this.clockTimer);
    this.clockTimer = setInterval(this.clock, 1000);
  };

  startRiveted = () => {
    // Calculate seconds from start to first interaction
    let currentTime = new Date().getTime();
    let diff = currentTime - this.startTime;

    // Set global
    this.started = true;

    // Send User Timing Event
    this.sendUserTiming(diff);

    // Start clock
    this.clockTimer = setInterval(this.clock, 1000);
  };

  resetRiveted = () => {
    this.startTime = new Date().getTime();
    this.clockTime = 0;
    this.started = false;
    this.stopped = false;
    clearInterval(this.clockTimer);
    clearTimeout(this.idleTimer);
  };

  trigger = () => {
    if (this.turnedOff) {
      return;
    }

    if (!this.started) {
      this.startRiveted();
    }

    if (this.stopped) {
      this.restartClock();
    }

    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(this.setIdle, this.idleTimeout * 1000 + 100);
  };
}

export default function rivetInit() {
  const riveted = new Riveted();

  riveted.init({
    idleTimeout: 30,
    reportInterval: 30,
    eventHandler: function (
      secondsOnPage: number,
      nonInteraction: boolean,
      reportInterval: number,
    ) {
      // Total fires of this event are tracked a user trait in Mixpanel people,
      // so that we can easily segment by total reading time.
      //
      // See the "Events to increment in People" section here:
      // https://app.segment.com/80000hours/destinations/mixpanel/sources/80000hours.org-production/configuration
      tracking.sendEvent("Stayed on page", {
        category: "Engagement",
        nonInteraction,
        label: secondsOnPage.toString(),
        value: reportInterval,
      });
    },
  });
}
