/* Singletone for music & SFX */

class Sounds {
  setTrack(element, name) {
    this[name] = element;
  }

  setVolume(sound, value) {
    this[sound].volume = value;
  }

  play(sound) {
    this[sound].currentTime = 0;
    this[sound].play();
  }

  stop(sound) {
    this[sound].stop();
  }
}

const sounds = new Sounds();

document.addEventListener('DOMContentLoaded', () => {
  Array.prototype.forEach.call(document.querySelectorAll('.brief__template'), (el) => {
    el.addEventListener('pointerdown', (e) => {
      e.target.remove();
    });
  });

  document.querySelector('.ost__main-theme').volume = '0.4';
  sounds.setTrack(document.querySelector('.ost__click'), 'Click');
  sounds.setTrack(document.querySelector('.ost__shutter'), 'Shutter');
  sounds.setTrack(document.querySelector('.ost__door-opened'), 'DoorOpened');
  sounds.setTrack(document.querySelector('.ost__success'), 'Clink');
});
