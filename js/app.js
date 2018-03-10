/**
 * @class App
 * @param {Element} el
 */
function App(el) {
  const appEl = el;
  const doors = [
    new Door0(0, onUnlock),
    new Door1(1, onUnlock),
    new Door2(2, onUnlock),
    new Box(3, onUnlock),
  ];

  this.doors = doors;

  for (let i = 0; i < doors.length; i++) {
    doors[i].enable();
  }

  /**
     * Callback вызывается в коде двери
     * Тут даем возможность открыть следующие двери
     */
  function onUnlock() {
    sounds.play('DoorOpened');
    let previousUnlocked;

    // Даем открыть следующую дверь
    for (let i = 0; i < doors.length; i++) {
      if (!doors[i].isLocked) {
        previousUnlocked = true;
      } else if (previousUnlocked && doors[i].isLocked) {
        doors[i].enable();
        break;
      }
    }
  }
}

// Start the app
const app = new App(document.querySelector('.app'));
