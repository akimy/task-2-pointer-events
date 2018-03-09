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
    setTimeout(() => {
      checkCondition.apply(this);
    }, 200);
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
    setTimeout(() => {
      checkCondition.apply(this);
    }, 200);
  }

  function _onLeftShutterPointerDown(e) {
    this[`start${e.pointerId}`] = e.pageX;
    e.target.setPointerCapture(e.pointerId);
  }

  function _onRightShutterPointerDown(e) {
    this[`start${e.pointerId}`] = e.pageX;
    e.target.setPointerCapture(e.pointerId);
  }

  function _onLeftShutterPointerMove(e) {
    if (!e.target.locked && e.target.style.transform.match(/\d+/g)[0] < 110) {
      const diff = this[`start${e.pointerId}`] - e.pageX;
      if (diff > 0) {
        e.target.style.transform = `translateX(${-25 - diff}px)`;
      }
    }
  }

  function _onRightShutterPointerMove(e) {
    if (!e.target.locked && e.target.style.transform.match(/\d+/g)[0] < 110) {
      const diff = this[`start${e.pointerId}`] - e.pageX;
      if (diff < 0) {
        e.target.style.transform = `translateX(${25 - diff}px)`;
      }
    }
  }

  const leftShutters = [
    this.popup.querySelector('.door__shutter_1'),
    this.popup.querySelector('.door__shutter_3'),
  ];

  const rightShutters = [
    this.popup.querySelector('.door__shutter_2'),
    this.popup.querySelector('.door__shutter_4'),
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
      this.unlock();
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
  // Для примера дверь откроется просто по клику на неё
  this.popup.addEventListener('click', () => {
    this.unlock();
  });
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

  // ==== Напишите свой код для открытия сундука здесь ====
  // Для примера сундук откроется просто по клику на него
  this.popup.addEventListener('click', () => {
    this.unlock();
  });
  // ==== END Напишите свой код для открытия сундука здесь ====

  this.showCongratulations = function () {
    alert('Поздравляю! Игра пройдена!');
  };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
