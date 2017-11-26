import $ from 'jquery';
import velocity from 'velocity-animate';
import events from 'events';

const IMAGE_PATH = '/img/thumb/';

/**
 * Work‚ÌUIƒNƒ‰ƒX
 */
export default class Work extends events {
  constructor(selector) {
    super();
    this.$ = $('.works');
    this.$work = this.$.find('a');

    this.$detail = $('.workDetail');
    this.$title = this.$detail.find('h3');
    this.$description = this.$detail.find('h4');
    this.$img = this.$detail.find('img');

    this.$back = this.$detail.find('.workDetail--back');
    this.$prev = this.$detail.find('.workDetail--box__prev');
    this.$next = this.$detail.find('.workDetail--box__next');

    this.index = 0;
    this.length = this.$work.length;
    this.titles = [];
    this.descriptions = [];

    this.loaded = [];

    this.initialize();
    this.bind()
  }

  initialize() {
    this.$work.each((index, element) => {
      const $element = $(element);
      this.titles.push($element.data('title'));
      this.descriptions.push($element.data('description'));
    });

    this.$title.css('opacity', 0);
    this.$description.css('opacity', 0);
    this.$img.css('opacity', 0);
    this.$back.css('opacity', 0);
    this.$prev.css('opacity', 0);
    this.$next.css('opacity', 0);
  }

  bind() {
    this.$work.on('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget;
      const index = this.$work.index(target);
      this.open(index);
    });

    this.$back.on('click', (e) => {
      e.preventDefault();
      this.close();
    });

    this.$prev.on('click', (e) => {
      e.preventDefault();
      this.prev();
    });

    this.$next.on('click', (e) => {
      e.preventDefault();
      this.next();
    });
  }

  open(index) {
    this.index = index;

    this.$title.text(this.titles[index]);
    this.$description.text(this.descriptions[index]);

    const src = `${IMAGE_PATH}/${index + 1}.jpg`;
    this.$img.attr('src', src);
    this.loaded[index] = true;

    velocity(this.$, 'fadeOut', 1000).then(() => {
      console.log('opened')
      velocity(this.$detail, 'stop');
      this.$detail.css({
        display: 'block',
        opacity: 1,
      });

      velocity(this.$img, 'fadeIn', {
        queue: false,
        duration: 1000,
      });

      velocity(this.$title, 'fadeIn', {
        queue: false,
        duration: 1000,
        delay: 400,
        display: 'inline-block',
      });

      velocity(this.$description, 'fadeIn', {
        queue: false,
        duration: 1000,
        delay: 600,
        display: 'inline-block',
      });

      velocity(this.$back, 'fadeIn', {
        queue: false,
        duration: 400,
        delay: 1000,
      });

      velocity(this.$prev, 'fadeIn', {
        queue: false,
        duration: 400,
        delay: 1000,
      });

      velocity(this.$next, 'fadeIn', {
        queue: false,
        duration: 400,
        delay: 1000,
      });

      this.loadNeighbor();
    });

  }

  close() {
    velocity(this.$detail, 'fadeOut', 1000).then(() => {
      this.$title.css('opacity', 0);
      this.$description.css('opacity', 0);
      this.$img.css('opacity', 0);
      this.$back.css('opacity', 0);
      this.$prev.css('opacity', 0);
      this.$next.css('opacity', 0);

      velocity(this.$, 'fadeIn', {
        duration: 1000,
        display: 'grid',
      });
    });
  }

  prev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.length - 1;
    }
    this.jump(this.index);
  }

  next() {
    this.index++;
    if (this.index >= this.length) {
      this.index = 0;
    }
    this.jump(this.index);
  }

  jump(index) {
    this.index = index;


    velocity(this.$img, 'fadeOut', {
      queue: false,
      duration: 400,
    });

    velocity(this.$title, 'fadeOut', {
      queue: false,
      duration: 400,
    });

    velocity(this.$description, 'fadeOut', {
      queue: false,
      duration: 400,
    }).then(() => {

      this.$title.text(this.titles[index]);
      this.$description.text(this.descriptions[index]);

      const src = `${IMAGE_PATH}/${index + 1}.jpg`;
      this.$img.attr('src', src);

      velocity(this.$img, 'fadeIn', {
        queue: false,
        duration: 400,
      });

      velocity(this.$title, 'fadeIn', {
        queue: false,
        duration: 400,
        delay: 400,
        display: 'inline-block',
      });

      velocity(this.$description, 'fadeIn', {
        queue: false,
        duration: 400,
        delay: 600,
        display: 'inline-block',
      });

      this.loadNeighbor();
    });
  }

  loadNeighbor() {
    let next = this.index + 1;
    let prev = this.index - 1;
    if (next === this.length) next = 0;
    if (prev === -1) prev = this.length - 1;

    if (!this.loaded[prev]) {
      const prevImage = new Image;
      prevImage.src = `${IMAGE_PATH}/${prev + 1}.jpg`;
    }
    if (!this.loaded[next]) {
      const nextImage = new Image;
      nextImage.src = `${IMAGE_PATH}/${next + 1}.jpg`;
    }

  }
}
