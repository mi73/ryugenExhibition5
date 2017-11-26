import $ from 'jquery';
import events from 'events';

/**
 * FEATURE‚ÌUIƒNƒ‰ƒX
 */
export default class Header extends events {
  constructor() {
    super();
    this.$ = $('.header');
    this.$a = this.$.find('.header--list a');

    this.initialize();
  }

  initialize() {
    const pathname = location.pathname;

    if (/about/.test(pathname)) this.$a.eq(0).addClass('is-active');
    if (/profiles/.test(pathname)) this.$a.eq(1).addClass('is-active');
    if (/works/.test(pathname)) this.$a.eq(2).addClass('is-active');
    if (/interview/.test(pathname)) this.$a.eq(3).addClass('is-active');
    if (/access/.test(pathname)) this.$a.eq(4).addClass('is-active');
  }
}
