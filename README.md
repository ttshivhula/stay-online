# Stay Online

Stay Online is a utility built with Node.js that simulates user activity to prevent the system from recognizing it as idle. It's especially handy if you want to avoid screen locks, sleep mode, or any other inactivity-triggered actions.

## Features

- **Mouse Movement Simulation**: Moves the mouse in a straight or circular pattern.
- **Keyboard Activity**: Simulates the pressing of the Shift key.
- **Random Intervals**: Optionally, you can set the tool to act at random intervals.
- **Flexible Modes**: Choose to simulate mouse movement, keyboard activity, or both.

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone this repository:
   ```bash
   git clone https://github.com/ttshivhula/stay-online.git
   ```
3. Navigate to the project directory and install the required dependencies:
   ```bash
   cd stay-online
   npm install
   ```

## Usage

Run the utility with the default settings (moves the mouse every 300 seconds):
```bash
node stay-online.js
```

You can customize the behavior with the following options:

- `-s, --seconds`: Define in seconds how long to wait after a user is considered idle. Default is 300 seconds.
- `-p, --pixels`: Set how many pixels the mouse should move. Default is 1 pixel.
- `-c, --circular`: Move the mouse in a circular pattern. By default, the mouse moves diagonally.
- `-m, --mode`: Choose between `keyboard`, `mouse`, or `both`. The default is `mouse`.
- `-r, --random`: Execute actions based on a random interval between start and stop seconds.

## Example

To move the mouse in a circular pattern every 10 seconds:
```bash
node stay-online.js -s 10 -c
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[ISC](https://choosealicense.com/licenses/isc/)
