var five = require('johnny-five');

function getMotorAConfig() {
  return {
    pins: {
      pwm: 3,
      dir: 12,
      brake: 9
    },
    current: {
      pin: 'A0',
      freq: 250,
      threshold: 10
    }
  };
}

function getMotorBConfig() {
  return {
    pins: {
      pwm: 11,
      dir: 13,
      brake: 8
    },
    current: {
      pin: 'A1',
      freq: 250,
      threshold: 10
    }
  };
}

function Control(board) {
  this.board = board;
  this.speed = 255;
  this._step = 10;
  this.motorLeft = new five.Motor(getMotorBConfig());
  this.motorRight = new five.Motor(getMotorAConfig());
  this._waitThenStop();
}

Control.prototype = {
  turnLeft: function () {
    this.motorLeft.reverse(this.speed);
    this.motorRight.forward(this.speed);
    this._registerLastCommand('turnLeft');
  },
  turnRight: function () {
    this.motorLeft.forward(this.speed);
    this.motorRight.reverse(this.speed);
    this._registerLastCommand('turnRight');
  },
  forward: function () {
    this.motorLeft.forward(this.speed);
    this.motorRight.forward(this.speed);
    this._registerLastCommand('forward');
  },
  reverse: function () {
    this.motorLeft.reverse(this.speed);
    this.motorRight.reverse(this.speed);
    this._registerLastCommand('reverse');
  },
  stop: function () {
    this.motorLeft.stop();
    this.motorRight.stop();
    delete this._shouldContinue;
  },
  _registerLastCommand: function (lastCommand) {
    if (lastCommand) {
      this._shouldContinue = true;
    }
  },
  _waitThenStop: function () {
    var self = this;
    var nextWait = 100;
    
    this.board.wait(nextWait, function () {
      if (!self._shouldContinue) {
        self.stop();
      }
      delete self._shouldContinue;
      self._waitThenStop();
    });
  }
};

module.exports = Control;
