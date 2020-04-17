
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
var strategy = {


    init : function() {
  console.log("init");
        // smooth the input to reduce the noise of the incoming data
        this.SMMA = new SMMA(SMMALimit);
        this.SMMALimit=7
        this.lastSMMA=0
        this.smmaFast=0
        this.diffPoints=10
        this.diffpercent=0.0087
        this.lastLongClose=0

      },
    
      update : function(candle) {
        console.log("update");
        this.SMMA.update( candle.close );
        this.lastSMMA=this.smmaFast  // to enhance 
        this.smmaFast = this.SMMA.result;
        
        console.log("smmaFast",this.smmaFast)
        console.log("candle",candle)
        console.log("SMMA : ",SMMA)
      },

      log : function() {
        console.log("log");
      },

      check : function(candle) {
        console.log("diff1 : ",this.smmaFast-this.lastSMMA)
        console.log("check");
        // this.advice('short');
        // if(this.smmaFast>this.lastSMMA*(1+this.diffpercent/2))
        if(this.smmaFast>this.lastSMMA+this.diffPoints)
        {
            console.log("diff2 : ",this.smmaFast-this.lastSMMA)
            // this.lastSMMA=this.smmaFast
            this.lastLongClose=candle.close
            this.advice('long');


        }
        else if(this.smmaFast<this.lastSMMA-this.diffPoints&&candle.close>this.lastLongClose+this.diffPoints)
        // else if(this.smmaFast<this.lastSMMA*(1-this.diffpercent))
        {
            console.log("diff3 : ",this.smmaFast-this.lastSMMA)
            this.lastSMMA= this.smmaFast
            this.advice('short');
            
        }
      },


      end : function() {
        console.log("end");
      },
    
    }
    module.exports = strategy;