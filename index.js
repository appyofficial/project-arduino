"use strict";

const five = require("johnny-five");

const board = new five.Board();
let led = null;

const express = require("express");
const app = express();

const port = 8000;

// Processing a ready event from the Arduino board
board.on("ready", () => {
  led = new five.Led(13);
});

/* using the express module to process HTTP GET requests in the format of /led/mode (where mode can be: { on, off, blink or stop }) */
app.get("/led/:mode", (req, res) => {
  if (led) {
    let status = "OK";

    switch (req.params.mode) {
      case "on":
        led.on();
        break;
      case "off":
        led.off();
        break;
      case "blink":
        led.blink();
        break;
      case "stop":
        led.stop();
        break;
      default:
        status = "Unknown: " + req.params.mode;
        break;
    }
    res.send(status);
  } else {
    res.send("Board not ready");
  }
});

// Listening
app.listen(port, () => {
  console.log("port is running");
});
