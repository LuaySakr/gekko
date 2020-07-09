/*

  StochRSI - SamThomp 11/06/2014

  (updated by askmike) @ 30/07/2016
interval = 14

[thresholds]
low = 20
high = 90
persistence = 5
#10min
 */
// helpers
var _ = require('lodash');
var log = require('../core/log.js');

var RSI = require('./indicators/RSI.js');

// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {
  console.log("settings", this.settings)
  console.log("tradingAdvisor", this.tradingAdvisor)
  lastLongPrice=0
  this.interval = this.settings.interval;

  this.trend = {
    direction: 'none',
    duration: 0,
    persisted: false,
    adviced: false
  };

  this.requiredHistory = this.tradingAdvisor.historySize;

  // define the indicators we need
  this.addIndicator('rsi', 'RSI', { interval: this.interval });

	this.RSIhistory = [];
}

// what happens on every new candle?
method.update = function(candle) {
	this.rsi = this.indicators.rsi.result;

	this.RSIhistory.push(this.rsi);

	if(_.size(this.RSIhistory) > this.interval)
		// remove oldest RSI value
		this.RSIhistory.shift();

	this.lowestRSI = _.min(this.RSIhistory);
	this.highestRSI = _.max(this.RSIhistory);
	this.stochRSI = ((this.rsi - this.lowestRSI) / (this.highestRSI - this.lowestRSI)) * 100;
}

// for debugging purposes log the last
// calculated parameters.
method.log = function() {
  var digits = 8;

  log.debug('calculated StochRSI properties for candle:');
  log.debug('\t', 'rsi:', this.rsi.toFixed(digits));
	log.debug("StochRSI min:\t\t" + this.lowestRSI.toFixed(digits));
	log.debug("StochRSI max:\t\t" + this.highestRSI.toFixed(digits));
	log.debug("StochRSI Value:\t\t" + this.stochRSI.toFixed(2));
}

method.check = function(candle) {
  // console.log("candle : ",candle)
	if(this.stochRSI > this.settings.thresholds.high) {
		// new trend detected
		if(this.trend.direction !== 'high')
			this.trend = {
				duration: 0,
				persisted: false,
				direction: 'high',
				adviced: false
			};

		this.trend.duration++;

		log.debug('In high since', this.trend.duration, 'candle(s)');
    console.log('In high since', this.trend.duration, 'candle(s)');
		if(this.trend.duration >= this.settings.thresholds.persistence)
			this.trend.persisted = true;

		if(this.trend.persisted && !this.trend.adviced) {
      this.trend.adviced = true;
      if(this.candle.close>lastLongPrice*(1 + this.settings.thresholds.minProf) || this.candle.close < lastLongPrice* (1 - this.settings.thresholds.maxLoss)){
        this.advice('short');
        lastLongPrice=0
        console.log("lastLongPrice : ",lastLongPrice)
      }
		} else
			this.advice();

	} else if(this.stochRSI < this.settings.thresholds.low) {

		// new trend detected
		if(this.trend.direction !== 'low')
			this.trend = {
				duration: 0,
				persisted: false,
				direction: 'low',
				adviced: false
			};

		this.trend.duration++;

    log.debug('In low since', this.trend.duration, 'candle(s)');
    console.log('In low since', this.trend.duration, 'candle(s)');

		if(this.trend.duration >= this.settings.thresholds.persistence)
			this.trend.persisted = true;

		if(this.trend.persisted && !this.trend.adviced) {
			this.trend.adviced = true;
      this.advice('long');
      lastLongPrice=this.candle.close
      console.log("lastLongPrice : ",lastLongPrice)
		} else
			this.advice();

	} else {
		// trends must be on consecutive candles
		this.trend.duration = 0;
		console.log('In no trend');

		this.advice();
	}

}

module.exports = method;
