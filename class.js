function x1sec(length) {
    var result = "";
    var characters = "123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function x10sec(length) {
    var result = "";
    var characters = "456";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  class TLMBot {
    constructor(minWaitTime = 5000, maxWaitTime = 15000) {
      this.minWaitTime = minWaitTime;
      this.maxWaitTime = maxWaitTime;
  
      this.isMining = false;
      this.isBotRunning = false;
      this.startedAt = 0;
      this.initialBalance = 0;
      this.accumulate = 0;
    }
  
    async start() {
       await TLMBot.delay(10000)
   console.log("start")

      while (1) {
    
        
      }
    }


  
  


    static delay(ms) {
      return new Promise((r) => {
        setTimeout((_) => r(), ms);
      });
    }
  
  }
  
  let bot = new TLMBot();
  await bot.start();
