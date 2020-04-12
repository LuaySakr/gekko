
//3 hours
var convnetjs = require('convnetjs');
var math = require('mathjs');


var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();

var SMMA = require('./indicators/SMMA.js');
var SMMALimit=5
var lastSMMA=0
var smmaFast=0
var diffPoints=0
var SMMA_Array=[]
var strategy = {


    init : function() {
  console.log("init");



      },
    
      update : function(candle) {
        // console.log("update");
        this.SMMA.update( candle.close );
        this.smmaFast = this.SMMA.result;
        this.SMMA_Array[1]=this.SMMA_Array[0]
        this.SMMA_Array[0]=this.SMMA.result
        
     
      },

      log : function() {
        // console.log("log");
      },

      check : function(candle) {

        this.advice({
          direction: 'long', // or short
          trigger: { // ignored when direction is not "long"
            type: 'trailingStop',
            // trailPercentage: 5
            // or:
            trailValue: 100
          }
        });
        // if(this.SMMA_Array[0]>this.SMMA_Array[1])
        // {
        //   console.log("candle",this.candle)
        //   console.log("long",this.SMMA_Array[0]-this.SMMA_Array[1])
        //   this.advice('long');
        // }
        // else if (this.SMMA_Array[0]<this.SMMA_Array[1]*this.diffPoints)
        // {
        //   console.log("candle",this.candle)

        //   console.log("short",this.SMMA_Array[0]-this.SMMA_Array[1])
        //   this.advice('short');
        // }
        // if(this.smmaFast>this.lastSMMA*(1+this.diffPoints))
        // {
        //     console.log("diff2 : ",this.smmaFast-this.lastSMMA)
        //     this.lastSMMA=this.smmaFast
        //     this.advice('long');

        // }
        // else if(this.smmaFast<this.lastSMMA*(1-this.diffPoints))
        // {
        //     console.log("diff3 : ",this.smmaFast-this.lastSMMA)
        //     this.lastSMMA=this.smmaFast
        //     this.advice('short');
        // }
      },


      end : function() {
        console.log("end");
      },
    
    }
    module.exports = strategy;