// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
  DoorBase.apply(this, arguments);

  function _onButtonPointerDown(e) {
    sounds.play('Click');
    e.target.classList.add('door-riddle__button_pressed');
    checkCondition.apply(this);
  }

  function _onButtonPointerUp(e) {
    e.target.classList.remove('door-riddle__button_pressed');
  }

  const buttons = [
    this.popup.querySelector('.door-riddle__button_0'),
    this.popup.querySelector('.door-riddle__button_1'),
    this.popup.querySelector('.door-riddle__button_2'),
  ];

  buttons.forEach((b) => {
    b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
  });
  /**
     * Проверяем, можно ли теперь открыть дверь
     */
  function checkCondition() {
    let isOpened = true;
    buttons.forEach((b) => {
      if (!b.classList.contains('door-riddle__button_pressed')) {
        isOpened = false;
      }
    });

    // Если все три кнопки зажаты одновременно, то откроем эту дверь
    if (isOpened) {
      this.unlock();
    }
  }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
  DoorBase.apply(this, arguments);

  // ==== Напишите свой код для открытия второй двери здесь ====
  function _onLeftShutterPointerUp(e) {
    /* If shutter does't closed then (given the location of this)
    return to initial coords or close shutter.
    */
    if (!e.target.locked) {
      const xCoord = -e.target.style.transform.match(/\d+/g)[0];
      if (xCoord > -90) {
        e.target.style.transform = 'translateX(-25px)';
      } else {
        e.target.style.transform = 'translateX(-90px)';
        sounds.play('Clink');
        e.target.locked = true;
      }
    }
    e.target.releasePointerCapture(e.pointerId);

    checkCondition.apply(this);
  }

  function _onRightShutterPointerUp(e) {
    if (!e.target.locked) {
      const xCoord = e.target.style.transform.match(/\d+/g)[0];
      if (xCoord < 90) {
        e.target.style.transform = 'translateX(25px)';
      } else {
        e.target.style.transform = 'translateX(90px)';
        sounds.play('Clink');
        e.target.locked = true;
      }
    }
    e.target.releasePointerCapture(e.pointerId);

    checkCondition.apply(this);
  }

  function _onLeftShutterPointerDown(e) {
    this[`start${e.pointerId}`] = e.pageX;
    e.target.setPointerCapture(e.pointerId);
  }

  function _onRightShutterPointerDown(e) {
    this[`start${e.pointerId}`] = e.pageX;
    e.target.setPointerCapture(e.pointerId);
  }

  // We take in mind the boundary conditions && directions
  function _onLeftShutterPointerMove(e) {
    if (!e.target.locked) {
      const diff = this[`start${e.pointerId}`] - e.pageX;
      if (diff > 0) {
        e.target.style.transform = `translateX(${-25 - diff}px)`;
      }
    }
  }

  function _onRightShutterPointerMove(e) {
    if (!e.target.locked) {
      const diff = this[`start${e.pointerId}`] - e.pageX;
      if (diff < 0) {
        e.target.style.transform = `translateX(${25 - diff}px)`;
      }
    }
  }

  const leftShutters = [
    this.popup.querySelector('.door__shutter_1'),
    this.popup.querySelector('.door__shutter_3'),
    this.popup.querySelector('.door__shutter_5'),
  ];

  const rightShutters = [
    this.popup.querySelector('.door__shutter_2'),
    this.popup.querySelector('.door__shutter_4'),
    this.popup.querySelector('.door__shutter_6'),
  ];

  leftShutters.forEach((shutter) => {
    shutter.addEventListener('pointerdown', _onLeftShutterPointerDown.bind(this));
    shutter.addEventListener('pointerup', _onLeftShutterPointerUp.bind(this));
    shutter.addEventListener('pointermove', _onLeftShutterPointerMove.bind(this));
  });

  rightShutters.forEach((shutter) => {
    shutter.addEventListener('pointerdown', _onRightShutterPointerDown.bind(this));
    shutter.addEventListener('pointerup', _onRightShutterPointerUp.bind(this));
    shutter.addEventListener('pointermove', _onRightShutterPointerMove.bind(this));
  });

  function checkCondition() {
    let isOpened = true;
    leftShutters.concat(rightShutters).forEach((el) => {
      if (!el.locked) {
        isOpened = false;
      }
    });

    if (isOpened) {
      setTimeout(() => {
        this.unlock();
      }, 400);
    }
  }
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
  DoorBase.apply(this, arguments);

  // ==== Напишите свой код для открытия третей двери здесь ====
  const diamond = document.querySelector('.diamond__container');
  const { x: secretX, y: secretY } = document.querySelector('.secret-place').getBoundingClientRect();
  diamond.firstElementChild.setAttribute('fill', 'hsla(0, 89%, 59%, 1)');

  function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  function _onDiamondPointerUp(e) {
    const { x: diamondX, y: diamondY } = e.target.getBoundingClientRect();
    const distance = getDistance(secretX, secretY, diamondX, diamondY);

    // If diamond is close enought to secret
    if (distance < 25) {
      e.target.style.transform = `translate(${secretX}, ${secretY})`;
      sounds.play('Shutter');
      setTimeout(() => {
        this.unlock();
      }, 1000);
    } else {
      e.target.style.transform = 'translate(15px, 15px)';
      e.target.firstElementChild.setAttribute(
        'fill',
        'hsla(0, 89%, 59%, 1)',
      );
    }
  }

  function _onDiamondPointerMove(e) {
    const { x: diamondX, y: diamondY } = e.target.getBoundingClientRect();
    const distance = getDistance(secretX, secretY, diamondX, diamondY);
    e.target.firstElementChild.setAttribute(
      'fill',
      `hsla(${120 - Math.min(distance, 120)}, 89%, 59%, 1)`,
    );
    const diffX = this[`startX${e.pointerId}`] - e.pageX;
    const diffY = this[`startY${e.pointerId}`] - e.pageY;
    e.target.style.transform = `translate(${15 - diffX}px, ${15 - diffY}px)`;
  }

  function _onDiamondPointerDown(e) {
    this[`startX${e.pointerId}`] = e.pageX;
    this[`startY${e.pointerId}`] = e.pageY;
    e.target.setPointerCapture(e.pointerId);
  }

  diamond.addEventListener('pointerdown', _onDiamondPointerDown.bind(this));
  diamond.addEventListener('pointerup', _onDiamondPointerUp.bind(this));
  diamond.addEventListener('pointermove', _onDiamondPointerMove.bind(this));
  // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
  DoorBase.apply(this, arguments);

  function playEffects(DOMelement, sfx) {
    sounds.play(sfx);
    const s = DOMelement.style;
    s.opacity = 1;
    (function fade() {
      (s.opacity -= 0.05) < 0 ? s.opacity = 0 : setTimeout(fade, 50);
    }());
  }

  function getAngle(el) {
    return Number(el.style.transform.match(/\d+/g));
  }

  function rotateColumn(el, diff) {
    const current = getAngle(el);
    let next = current + diff;
    switch (next) {
      case -90: next = 270;
        break;
      case -180: next = 180;
        break;
      case 450: next = 90;
        break;
      case 360: next = 0;
    }

    el.style.transform = `rotate(${next}deg)`;
  }

  const topPlate = this.popup.querySelector('.plate_top');
  const leftPlate = this.popup.querySelector('.plate_left');
  const rightPlate = this.popup.querySelector('.plate_right');
  const [fire, water, earth, air] = this.popup.querySelectorAll('.treashure__column');

  const stage = new Hammer.Manager(this.popup);
  stage.add(new Hammer.Swipe());

  stage.on('swipeup', () => {
    playEffects(topPlate, 'Clink');
    rotateColumn(fire, 90);
    rotateColumn(water, -90);
    rotateColumn(air, 180);
    checkCondition.apply(this);
  });

  stage.on('swipeleft', () => {
    playEffects(leftPlate, 'Click');
    rotateColumn(earth, 90);
    rotateColumn(water, 180);
    rotateColumn(air, -90);
    checkCondition.apply(this);
  });

  stage.on('swiperight', () => {
    playEffects(rightPlate, 'Click');
    rotateColumn(fire, -180);
    rotateColumn(water, 90);
    rotateColumn(earth, -90);
    checkCondition.apply(this);
  });

  function checkCondition() {
    if (getAngle(fire) === 0 && getAngle(water) === 90 &&
    getAngle(earth) === 180 && getAngle(air) === 270) {
      this.showCongratulations();
    }
  }

  // ==== END Напишите свой код для открытия сундука здесь ====

  this.showCongratulations = () => {
    setTimeout(() => {
      document.querySelector('.finish__description').style.display = 'flex';
    }, 500);
  };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
