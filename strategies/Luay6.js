
var convnetjs = require('convnetjs');
var math = require('mathjs');


var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();

var SMMA1 = require('./indicators/SMMA.js');
var SMMA2 = require('./indicators/SMMA.js');
var SMMALimit=5
var lastSMMA1=[]
var lastSMMA2=[]
var factor=0
var lastLong=0

var strategy = {


    init : function() {
  console.log("init");
        this.lastSMMA1=[2]
        this.lastSMMA2=[2]
        this.factor=0.009
        this.lastlong=0

        // smooth the input to reduce the noise of the incoming data
        this.SMMA1 = new SMMA1(SMMALimit);
        this.SMMA2 = new SMMA2(SMMALimit);
        this.lastSMMA1[0]=0
        this.lastSMMA2[0]=0
      },
    
      update : function(candle) {
        

        this.SMMA1.update( candle.close );
        this.SMMA2.update( candle.open);
        this.lastSMMA1[1]=this.lastSMMA1[0]
        this.lastSMMA2[1]=this.lastSMMA2[0]
        this.lastSMMA1[0]=this.SMMA1.result
        this.lastSMMA2[0]=this.SMMA2.result
        
        
      },

      log : function() {
        
      },

      check : function(candle) {
        

        // if(this.SMMA1.result<this.SMMA2.result&&this.lastSMMA1[1]<this.lastSMMA1[0])
        // if(this.lastSMMA1[1]<this.lastSMMA1[0]*(1-this.factor))
        // if(this.lastSMMA1[1]<this.lastSMMA1[0])
        if(this.lastSMMA1[1]<this.lastSMMA1[0]&&this.lastSMMA2[1]<this.lastSMMA2[0])
        {
          this.advice('long')
          this.lastLong=candle.close
        }
        // else if(this.SMMA1.result>this.SMMA2.result&&this.lastSMMA1[1]>this.lastSMMA1[0])
        // else if(this.lastSMMA1[1]>this.lastSMMA1[0]*(1+this.factor))
        // else if(this.SMMA1.result>this.SMMA2.result&&this.lastSMMA1[1]>this.lastSMMA1[0])
        // else if(this.lastSMMA1[1]>this.lastSMMA1[0]&&this.lastSMMA2[1]>this.lastSMMA2[0])
        else if(this.lastSMMA1[1]>this.lastSMMA1[0]&&this.lastSMMA2[1]>this.lastSMMA2[0]&&this.lastlong<candle.close*(1+this.factor))
        {
          this.advice('short')
        }
        else{
          console.log("candle: ", candle)
          console.log("SMMA1[0]: ", this.lastSMMA1[0])
          console.log("SMMA1[1]: ", this.lastSMMA1[1])
          console.log("SMMA2[0]: ", this.lastSMMA2[0])
          console.log("SMMA2[1]: ", this.lastSMMA2[1])
        }
      },


      end : function() {
        console.log("end");
      },
    
    }
    module.exports = strategy;