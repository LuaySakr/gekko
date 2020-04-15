
//90 min

var convnetjs = require('convnetjs');
var math = require('mathjs');


var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();

var SMMA = require('./indicators/SMA.js');

var SMMALimit=5
var lastSMMA=0
var smmaFast=0
var diffPoints=0
this.candleArrayCounter=0
var strategy = {


    init : function() {
  console.log("init");

        // smooth the input to reduce the noise of the incoming data
        this.SMMA = new SMMA(SMMALimit);
        this.SMMALimit=7
        this.lastSMMA=0
        this.smmaFast=0
        this.diffPoints=100
        this.diffpercent=0.0087
        this.lastLongClose=0

        this.candleArray=[]
        this.candleArrayCounter=0
        this.candleArrayLenth=5

      },
    
      update : function(candle) {

        this.candleArray[this.candleArrayCounter++%this.candleArrayLenth]=this.candle
        console.log("update");
        this.SMMA.update( candle.close );
        this.smmaFast = this.SMMA.result;
        for(i=0; i<this.candleArrayLenth ; i++)
        {
          console.log(i,this.candleArray[i]);
        }
        
        console.log("smmaFast",this.smmaFast)
        console.log("candle",candle)
        console.log("SMMA : ",SMMA)
       
      },

      log : function() {
        console.log("log");
      },

      check : function(candle) {
        if( this.candle.low>this.candleArray[(this.candleArrayCounter-1)%this.candleArrayLenth].close)
        {
          this.lastLongClose=this.candle.close
          this.advice('long')
        }
        else if( this.candle.low>this.candleArray[(this.candleArrayCounter-1)%this.candleArrayLenth].close
        && this.candle.low>this.lastLongClose+this.diffPoints)
        {
          this.lastLongClose=0
          this.advice('short')
        }
        
      },


      end : function() {
        console.log("end");
      },
    
    }
    module.exports = strategy;