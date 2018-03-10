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
  const briefs = document.querySelectorAll('.brief__template');
  briefs.forEach((el) => {
    el.addEventListener('click', (event) => {
      const { target } = event;
      target.style.display = 'none';
    });
  });

  sounds.setTrack(document.querySelector('.ost__click'), 'Click');
  sounds.setTrack(document.querySelector('.ost__shutter'), 'Shutter');
  sounds.setTrack(document.querySelector('.ost__door-opened'), 'DoorOpened');
  sounds.setTrack(document.querySelector('.ost__success'), 'Clink');
});
