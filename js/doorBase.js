/**
 * Базовый класс всех дверей
 * @class DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function pluralMessage(number) {
  switch (Number(number)) {
    case 0: return 'на первый этаж';
    case 1: return 'на второй этаж';
    case 2: return 'к сундуку';
    default: return 'в глубины';
  }
}

function DoorBase(number, onUnlock) {
  function onDoorClick() {
    if (!this.isDisabled) {
      this.openPopup();
    }
  }

  function onCloseClick() {
    this.closePopup();
  }

  this.number = number;
  this.onUnclockCallback = onUnlock;

  this.level = document.querySelector(`.level_${number}`);
  this.door = document.querySelector(`.door_level_${number}`);
  this.popup = document.querySelector(`.popup_level_${number}`);
  this.close = this.popup.querySelector('.popup__close');

  this.isLocked = true;
  this.isDisabled = this.door.classList.contains('door_disabled');

  this.door.addEventListener('click', onDoorClick.bind(this));
  this.close.addEventListener('click', onCloseClick.bind(this));
}

DoorBase.prototype = {
  openPopup() {
    this.popup.classList.remove('popup_hidden');
  },
  closePopup() {
    this.popup.classList.add('popup_hidden');
  },
  enable() {
    this.door.classList.remove('door_disabled');
    this.isDisabled = false;
  },
  /**
     * Вызывается, если после последовательности действий
     * дверь считается открытой
     */
  unlock() {
    if (this.isLocked) {
      this.door.classList.remove('door_locked');
      this.isLocked = false;
      this.closePopup();
      this.onUnclockCallback();
      this.showCongratulations();
    }
  },
  showCongratulations() {
    const wrapperNode = document.querySelector('.container');
    const template = document.getElementById('template');
    const clone = template.content.cloneNode(true);
    const labelNode = clone.querySelector('.brief__label');
    labelNode.innerHTML = `Дверь ${pluralMessage(this.number)} открыта!`;
    clone.querySelector('.brief__template').addEventListener('pointerdown', (e) => {
      e.target.remove();
    });
    wrapperNode.appendChild(clone);
    // alert(`Дверь ${pluralMessage(this.number)} открыта!`);
  },
};
