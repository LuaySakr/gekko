
//5 min
//8 min
//9 min
//13 min
//14 min
//15 min
// var nodemailer = require('nodemailer');
var convnetjs = require('convnetjs');
var math = require('mathjs');


var log = require('../core/log.js');

var config = require ('../core/util.js').getConfig();
// var SMA = require('./indicators/SMA.js');

var SMAshort = require('./indicators/SMA.js');
var SMAlong = require('./indicators/SMA.js');
SMAshortLimit=3
SMAlongLimit=7
lowTan=0.565
var strategy = {


    init : function() {
      this.advice('short')
              console.log('Action---------->','short')
  console.log("init");
  this.maxtan=0
 


        this.SMAshort = new SMAshort(SMAshortLimit);
        this.SMAlong = new SMAlong(SMAlongLimit);
      },
    
      update : function(candle) {
        this.lastSMAshort=this.SMAshort.result;
        this.SMAshort.update( candle.close );
        this.SMAlong.update( candle.close );
      },

      log : function() {

      },

      check : function(candle) {
        var delta=Math.abs(this.SMAshort.result-this.lastSMAshort)
        var tan=Math.abs(Math.tan(delta))//Math.max(this.SMAshort.result,this.lastSMAshort)*10000
        if(tan>this.maxtan)
        {
          this.maxtan=tan
        }
        console.log('SMAshort',this.SMAshort.result)
        console.log('lastSMAshort',this.lastSMAshort)
        console.log('abs',Math.abs(this.SMAshort.result-this.lastSMAshort))
        console.log('max',Math.tan(delta))
        console.log('delta',delta)
        console.log('tan',tan)
        console.log('Maxtan',this.maxtan)
          
         if(this.SMAlong.result>this.SMAshort.result&& tan<lowTan)
          {
              this.lastOrderPrice=this.candle.close
              this.advice('long')
              console.log('Action---------->','long')
          }
          if(
            this.SMAshort.result>this.SMAlong.result&&
            (tan<lowTan )&&
            (
                this.candle.close>this.lastOrderPrice*1.025
            
                || this.candle.close*1.02<this.lastOrderPrice
            
                )
            )
          {
              this.advice('short')
              console.log('Action---------->','short')
          }

 
      },


      end : function() {
       
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'luaysakr@gmail.com',
//       pass: ''
//     }
//   });
  
//   var mailOptions = {
//     from: 'LuaySakr@gmail.com',
//     to: 'LuaySakr@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
      },
    
    }
    module.exports = strategy;