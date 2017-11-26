import Works from './modules/Works';
import Header from './modules/Header';

/**
 * Main Script of bmw new x3 series.
 */
class Index {
  constructor() {
    new Works;
    new Header;
  }

  /**
   * デバイスリダイレクト
   */
  redirect() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = (userAgent.indexOf('iphone') !== -1 ||
      userAgent.indexOf('ipod') !== -1 ||
      (userAgent.indexOf('android') !== -1 && userAgent.indexOf('mobile') !== -1));

    if (isMobile) {
      location.href = `${location.pathname}sp/${location.search}${location.hash}`;
    }
  }
}

window.INDEX = new Index();
