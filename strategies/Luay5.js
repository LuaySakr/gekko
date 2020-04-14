
//3 hours
var convnetjs = require('convnetjs');
var math = require('mathjs');
var fs = require('fs');

var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();

var BB = require('./indicators/BB.js');
var BB2 = require('./indicators/BB2.js');
var CCI = require('./indicators/CCI.js');
var DEMA = require('./indicators/DEMA.js');
var EMA = require('./indicators/EMA.js');
var LRC = require('./indicators/LRC.js');
var MACD = require('./indicators/MACD.js');
var PPO = require('./indicators/PPO.js');
var RSI = require('./indicators/RSI.js');
var SMA = require('./indicators/SMA.js');
var SMMA = require('./indicators/SMMA.js');
var StopLoss = require('./indicators/StopLoss.js');
var TSI = require('./indicators/TSI.js');
var UO = require('./indicators/UO.js');


var BBSettings={
  TimePeriod:5,
  NbDevUp: 5,
  NbDevDn: 5
}

var SMMALimit = 5


var strategy = {


    init : function() {
  console.log("init");


  var BBSettings={
    TimePeriod:5,
    NbDevUp: 5,
    NbDevDn: 5
  }
  this.BB=new BB(BBSettings);
  this.SMMA = new SMMA(SMMALimit);

      },
    
      update : function(candle) {



        console.log(candle)
//         fs.appendFile('mynewfile1.txt', 
// this.candle.start+","+Math.round(this.SMMA.result)+"\n" , function (err) {
//           if (err) throw err;
//           console.log('Saved!');
//         });


        this.BB.update(this.candle.close)
        this.SMMA.update(this.candle.close)
        // console.log(this.BB.prices) //[]
        // console.log(this.BB.diffs) //[]
        console.log(this.BB.age) 
        // console.log(this.SMMA.result)

      },

      log : function() {

      },

      check : function(candle) {

 
      },


      end : function() {
       
      },
    
    }
    module.exports = strategy;