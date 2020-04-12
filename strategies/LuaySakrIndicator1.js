// Let's create our own strategy
var strat = {};

strat.previousCandles = [] ;

// Prepare everything our strat needs
strat.init = function() {
    var customMACDSettings = {

        
        // optInFastPeriod: 10,
        // optInSlowPeriod: 21,
        // optInSignalPeriod: 9
      }
    
      // add the indicator to the strategy
      this.addTulipIndicator('myEMA', 'EMA', customMACDSettings);
  // your code!
  this.pointer = 0 ;

  this.requiredHistory = 5; // require 5 candles before giving advice

}

// What happens on every new candle?
strat.update = function(candle) {
  // your code!
}

// For debugging purposes.
strat.log = function() {
  // your code!
}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function(candle) {

      // use indicator results
//   var result = this.tulipIndicators.mymacd.result;
  console.log("indicators",this.tulipIndicators)
//   var macddiff = result['macd'] - result['macdSignal'];
  

  // do something with macdiff
    // console.log("check",candle);
    // this.previousCandles[this.pointer++%this.requiredHistor]=(candle)

    // console.log("ïndex",this.pointer%this.requiredHistory)
    // if(this.pointer>9)
    // {
      
    //   console.log("history",this.previousCandles[this.pointerthis.requiredHistory])

    //   for( i=0;i<this.requiredHistor;i++)
    //   {
    //     console.log(i,this.previousCandles[i])

    //   };
    // }

    
  // your code!
  this.advice({
    direction: 'long', // or short
    trigger: { // ignored when direction is not "long"
      type: 'trailingStop',
      trailPercentage: 5
      // or:
      // trailValue: 100
    }
  });
  // console.log("trailPercentage",this.advice);
}

// Optional for executing code
// after completion of a backtest.
// This block will not execute in
// live use as a live gekko is
// never ending.
strat.end = function() {
  // your code!
}

module.exports = strat;