#!/usr/bin/env node
const robot = require('robotjs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('seconds', {
    alias: 's',
    description: 'Define in seconds how long to wait after a user is considered idle. Default 300.',
    type: 'number',
    default: 300
  })
  .option('pixels', {
    alias: 'p',
    description: 'Set how many pixels the mouse should move. Default 1.',
    type: 'number',
    default: 1
  })
  .option('circular', {
    alias: 'c',
    description: 'Move mouse in a circle. Default move diagonally.',
    type: 'boolean',
    default: false
  })
  .option('mode', {
    alias: 'm',
    description: 'Available options: keyboard, mouse, both; default is mouse.',
    type: 'string',
    default: 'mouse'
  })
  .option('random', {
    alias: 'r',
    description: 'Execute actions based on a random interval between start and stop seconds.',
    type: 'array'
  })
  .argv;

let moveMouseEverySeconds = argv.seconds;
let mouseDirection = 0;

function getNowTimestamp() {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

function moveMouse(currentPosition) {
  let delta = {
    x: argv.pixels * (mouseDirection === 0 || mouseDirection === 3 ? 1 : -1),
    y: argv.pixels * (mouseDirection === 0 || mouseDirection === 1 ? 1 : -1)
  };

  let newPosition = {
    x: currentPosition.x + delta.x,
    y: currentPosition.y + delta.y
  };
  
  robot.moveMouse(newPosition.x, newPosition.y);
  if (argv.circular) {
    mouseDirection = (mouseDirection + 1) % 4;
  }

  console.log(getNowTimestamp(), 'Moved mouse to: ', newPosition);
}

function pressShiftKey() {
  robot.keyTap('shift');
  console.log(getNowTimestamp(), 'Shift key pressed');
}

function executeKeepAwakeAction() {
  console.log(getNowTimestamp(), 'Idle detection');
  const currentPosition = robot.getMousePos();

  if (argv.mode === 'mouse' || argv.mode === 'both') {
    moveMouse(currentPosition);
  }

  if (argv.mode === 'keyboard' || argv.mode === 'both') {
    pressShiftKey();
  }
}

// Initialization logging
console.log('--------');
if (argv.mode === 'keyboard' || argv.mode === 'both') {
  console.log(getNowTimestamp(), "Keyboard is enabled");
}

if (argv.mode === 'mouse' || argv.mode === 'both') {
  console.log(getNowTimestamp(), `Mouse is enabled, moving ${argv.pixels} pixels`, 
              argv.circular ? '(circularly)' : '');
}

if (argv.random) {
  console.log(getNowTimestamp(), "Random timing is enabled.");
} else {
  console.log(getNowTimestamp(), `Running every ${moveMouseEverySeconds} seconds`);
}
console.log('--------');

let lastPosition = robot.getMousePos();

const interval = setInterval(() => {
  const currentPosition = robot.getMousePos();

  if (currentPosition.x === lastPosition.x && currentPosition.y === lastPosition.y) {
    executeKeepAwakeAction();
  } else {
    console.log(getNowTimestamp(), 'User activity detected');
  }

  if (argv.random) {
    const randDelay = Math.floor(Math.random() * (argv.random[1] - argv.random[0] + 1) + argv.random[0]);
    console.log(getNowTimestamp(), `Delay: ${randDelay}`);
    moveMouseEverySeconds = randDelay;
  }

  lastPosition = currentPosition;
}, moveMouseEverySeconds * 1000);

// Handle CTRL+C gracefully
process.on('SIGINT', function() {
  clearInterval(interval);
  console.log("\nBye bye ;-)");
  process.exit(0);
});
