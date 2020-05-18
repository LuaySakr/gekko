
//3 hours
var convnetjs = require('convnetjs');
var math = require('mathjs');


var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();

var strategy = {


    init : function() {
  console.log("init");

      this.DnInd=0
      this.upInd=0
      this.IsInOrder=false
      this.lastPrice=0
      this.currentPrice=0
      this.buyPrice=0
      this.lastlastpower=0
      this.lastpower=0
      this.currentPower=0
      this.count=1
      this.waiting=0
      
      },
    
      update : function(candle) {
        this.lastPrice=this.currentPrice
        this.currentPrice=candle.close
        this.lastlastpower=this.lastpower
        this.lastpower=this.currentPower
        this.currentPower=(this.currentPrice-this.lastPrice)**3


        // console.log('candle :',candle)
        // console.log('power3 :', (this.currentPrice-this.lastPrice)**3)
      },

      log : function() {
        

      },

      check : function(candle) {

        cond1=this.losecount>400
        cond2= this.buyPrice>this.candle.close*1.1 //false //his.buyPrice*1.01>this.candle.close
        cond3= this.buyPrice*1.045<this.candle.close
        cond4=(this.lastpower-this.lastlastpower)*1.01<this.currentPower-this.lastpower 

        if(cond4)
        {
          this.waiting=this.waiting-1
        }
        if (this.lastPrice<this.currentPrice)
        {
          // console.log("/") 
          this.upInd=this.upInd+1
          // this.DnInd=this.DnInd+1
        }
        else if (this.lastPrice>this.currentPrice)
        {

          // console.log("\\")
          this.DnInd=this.DnInd-1
          // this.upInd=this.upInd-1
        }
        if(cond4&&this.waiting<1&& this.IsInOrder==false)
        {
          this.byStart=candle.start
          this.waiting=0
          this.advice('long')
          this.IsInOrder=true
          this.DnInd=0
          this.upInd=0
          this.buyPrice=candle.close
        }
        else if(
          (
            (
              this.lastpower-this.lastlastpower>this.currentPower-this.lastpower 
              &&
              (
                cond1||cond2|| cond3
                )
                )
                && this.IsInOrder==true
                )
        )
        {  
          this.byEnd=candle.start
          if(cond1)
          {
            console.log(this.count,this.byStart,this.byEnd,1)
          }

          if(cond2)
          {
            console.log(this.count,this.byStart,this.byEnd,2)
          }

          if(cond3)
          {
            console.log(this.count,this.byStart,this.byEnd,3)
          }
          this.count=this.count+1
          this.advice('short')
          this.IsInOrder=false
          this.DnInd=0
          this.upInd=0
          this.buyPrice=0
          this.losecount=0

          // console.log('upInd:',this.upInd)
          // console.log('DnInd:',this.DnInd)

        }
        else if((this.lastpower-this.lastlastpower>this.currentPower-this.lastpower ) && this.IsInOrder==true)
        {  
          this.losecount=this.losecount+1
          this.waiting=this.waiting+1
         

          // console.log('upInd:',this.upInd)
          // console.log('DnInd:',this.DnInd)

        }
        // console.log('upInd:',this.upInd)
        // console.log('DnInd:',this.DnInd)

 
      },


      end : function() {
       
      },
    
    }
    module.exports = strategy;