
//3 hours
var convnetjs = require('convnetjs');
var math = require('mathjs');


var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();

var strategy = {


    init : function() {
  console.log("init");
      this.buyPrice=0;
      this.prvMaxPrice=0
      this.maxPrice=0;
      this.prvMinPrice=0
      this.minPrice=0;
      this.lastPrice=0
      this.currentPrice=0
      this.isInOrder=false
      this.profit=0.0




      },
    
      update : function(candle) {
        this.lastPrice=this.currentPrice
        this.currentPrice=this.candle.close

        // if(this.candle.close>this.maxPrice)
        // {
        //   if(this.maxPrice>this.prvMaxPrice)
        //   {
        //     this.prvMaxPrice=this.maxPrice;
        //   }
            // this.maxPrice=this.candle.close;
          // console.log("max :",this.maxPrice)
        //   console.log("prvMax :",this.prvMaxPrice)
        // }
        
        // if(this.candle.close<this.minPrice||this.minPrice==0)
        // {
        //   if(this.minPrice<this.prvMinPrice)
        //   {
        //     this.prvMinPrice=this.minPrice;
        //   }
          // this.minPrice=this.candle.close;

          // console.log("min :",this.minPrice)
        //   console.log("prvMin :",this.prvMinPrice)
        // }

      },

      log : function() {

      },

      check : function(candle) {
        console.log('tan:', this.currentPrice/this.lastPrice)
        console.log('currentPrice:', this.currentPrice)
        console.log('lastPrice:', this.lastPrice)
        if(this.currentPrice/this.lastPrice>1.001 && this.isInOrder==false)
        {
          this.advice('long')
          this.buyPrice=this.candle.close
          console.log('long : ',this.candle.close)
          
          this.isInOrder=true
        }
        else if(
          this.currentPrice/this.lastPrice<1 &&
          
          (
            // this.candle.close/this.buyPrice>1.01
            // || this.candle.close>this.buyPrice
          // ||
          (this.candle.close/this.buyPrice<0.9 && this.profit-(this.candle.close/this.buyPrice) >10)
          )&&
            this.isInOrder==true)
        {

          this.advice('short')
          this.buyPrice=0
          console.log('short : ',this.candle.close)
          this.isInOrder=false
          if(this.candle.close>this.buyPrice)
          {
            this.profit=this.profit+(this.candle.close/this.buyPrice)
          }
          else if(this.candle.close<this.buyPrice)
          {
            this.profit=this.profit-(this.candle.close/this.buyPrice)
          }

          // this.lastPrice=0
          // this.currentPrice=0
        }
        // if(this.candle.close>this.maxPrice)
        // {
        //   this.advice('long')
        //   this.buyPrice=this.candle.close
        //   this.maxPrice=this.candle.close;
        // }

        // if(this.candle.close<this.maxPrice)
        // {
        //   if(this.candle.close>this.buyPrice)
        //   {
        //     this.advice('short')
        //   }

        // }


        // if(this.prvMaxPrice/this.maxPrice>this.maxPrice/this.candle.close)
        // {
        //   this.advice('long')
        // }
        // if(this.prvMinPrice/this.minPrice<this.minPrice/this.candle.close)
        // {
        //   this.advice('short')
        // }

 
      },


      end : function() {
       
      },
    
    }
    module.exports = strategy;