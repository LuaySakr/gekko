
//3 hours
var convnetjs = require('convnetjs');
var math = require('mathjs');


var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();

var strategy = {


    init : function() {
  console.log("init");
  this.lastPrice=0
  this.isLastOperationLong=false
  this.lastClose=0
  this.thisClose=0

      },
    
      update : function(candle) {


      },

      log : function() {

      },

      check : function(candle) {

        this.lastClose=this.thisClose
        this.thisClose=this.candle.close
        if(this.isLastOperationLong==false && this.candle.close>this.lastClose* 1.005)
        {
          this.advice('long')
          this.isLastOperationLong=true
          this.lastPrice=this.candle.close
          console.log("Operation =========== > Long")
          console.log("candle : ", this.candle)

        }
        else if(this.isLastOperationLong==true)
        {
          if( this.candle.close>this.lastPrice* 1.04 || this.candle.close<this.lastPrice* 0.99)
          {
            this.advice('short')
            this.isLastOperationLong=false
            // this.lastPrice=this.candle.close
            console.log("Operation =========== > Short")
            console.log("candle : ", this.candle)
          }
          


        }
 
      },


      end : function() {
       
      },
    
    }
    module.exports = strategy;