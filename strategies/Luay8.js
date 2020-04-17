
//3 hours
var convnetjs = require('convnetjs');
var math = require('mathjs');


var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();
var SMMA = require('./indicators/SMMA.js');
var SMMAlack = require('./indicators/SMMA.js');
SMMALimit=10

var fs = require('fs');

var strategy = {


    init : function() {
  console.log("init");

  this.SMMA = new SMMA(SMMALimit);
  this.SMMAlack = new SMMA(SMMALimit+2);
      },
    
      update : function(candle) {
        this.SMMA.update( candle.close );
        this.SMMAlack.update(candle.close);

        console.log("SMMA,",Math.round(this.SMMA.result))
        console.log("SMMAlacked,",Math.round(this.SMMAlack.result))

        // fs.appendFile('Luay8.csv', 
        // this.candle.start
        // +","+Math.round(this.SMMA.result)
        // +","+Math.round(this.SMMAlack.result)
        // +"\n" 
        //   , function (err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        //   });
        },

      log : function() {

      },

      check : function(candle) {
        if (this.SMMA.result>this.SMMAlack.result*(1-0.001))
        
        {
          this.advice('long');
         
        }
        
        else if(this.SMMAlack.result>this.SMMA.result*(1+0.001))
        {
          this.advice('short')
        }

 
      },


      end : function() {
       
      },
    
    }
    module.exports = strategy;