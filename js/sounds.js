/* Singletone for music & SFX */

class Sounds {
  setTrack(element, name) {
    return new Promise((resolve) => {
      this[name] = element;
      resolve();
    });
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
  sounds.setTrack(document.querySelector('.ost__main-theme'), 'MainTheme')
    .then(() => {
      sounds.play('MainTheme');
      sounds.setVolume('MainTheme', 0.4);
    });

  sounds.setTrack(document.querySelector('.ost__click'), 'Click');
  sounds.setTrack(document.querySelector('.ost__shutter'), 'Shutter');
  sounds.setTrack(document.querySelector('.ost__door-opened'), 'DoorOpened');
  sounds.setTrack(document.querySelector('.ost__success'), 'Clink');
});
