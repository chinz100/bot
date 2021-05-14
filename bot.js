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

        await this.login();

        this.isBotRunning = true;
        this.startedAt = new Date();
        this.initialBalance = await this.getBalance();

        console.log(`%c[Bot] TLM Bot Started! Your current balance is ${this.initialBalance} TLM.`, 'color:green');

        while (this.isBotRunning) {
            await bot.cooldown();
            await bot.mine();
        }

    }

    async stop() {
        this.isBotRunning = false;
        const current_balance = await this.getBalance();
        console.log(`
%c[Bot] TLM Bot Stopped. \n
You run the bot for ${TLMBot.howLongFrom(this.startedAt)}. Since ${this.startedAt}
Your current balance is ${current_balance} TLM. \n
You earn ${this.accumulate} TLM in total.
        `, 'color:green');
        this.initialBalance = 0;
        this.accumulate = 0;
    }

    getRandomTimeWait() {
        return this.minWaitTime + Math.floor(Math.random() * (this.maxWaitTime - this.minWaitTime));
    }

    async login() {
        this.id = await wax.login();
        unityInstance.SendMessage('Controller', 'Server_Response_LoginData', this.id);
        console.log(`%c[Bot] You're logged in as ` + this.id, 'color:green');
    }

    async cooldown() {
        return new Promise(resolve => {
            getMineDelay(this.id).then(mineDelay => {
                if (mineDelay <= 0) {
                    console.log(`%c[Bot] Cooldown finished.`, 'color:green');
                    resolve();
                } else {
                    const waitTime = mineDelay + this.getRandomTimeWait();
                    console.log(`%c[Bot] Cooldown for ${Math.ceil(waitTime/1000)} seconds`, 'color:green');
                    TLMBot.delay(waitTime).then(_ => {
                        if (this.isMining) {
                            return this.cooldown();
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    async mine() {
        return new Promise((success, fail) => {

            background_mine(this.id).then(work => {

                unityInstance.SendMessage('Controller', 'Server_Response_Mine', JSON.stringify(work));
                console.log(`%c[Bot] ${work.account} Pushing mine results...`, 'color:green');

                const actions = [{
                    account: mining_account,
                    name: 'mine',
                    authorization: [{
                        actor: work.account,
                        permission: 'active',
                    }],
                    data: {
                        miner: work.account,
                        nonce: work.rand_str,
                    },
                }];
                console.log('%c[Bot] transacting: ', 'color:green', actions);

                wax.api.transact({
                    actions
                }, {
                    blocksBehind: 3,
                    expireSeconds: 90
                }).then((result) => {
                    console.log('%c[Bot] Mining result:', 'color:green', result);
                    let amounts = new Map();
                    if (result && result.processed) {
                        let accumulate = 0;
                        result.processed.action_traces[0].inline_traces.forEach(item => {
                            if (item.act.data.quantity) {
                                

                                if (amounts.has(item.act.data.to)) {

                                    let obStr = amounts.get(item.act.data.to);
                                    obStr = obStr.substring(0, obStr.length - 4);

                                    let nbStr = item.act.data.quantity;
                                    nbStr = nbStr.substring(0, nbStr.length - 4);

                                    let balance = (parseFloat(obStr) + parseFloat(nbStr)).toFixed(4);

                                    accumulate += balance;

                                    amounts.set(item.act.data.to, balance.toString() + ' TLM');

                                } else {
                                    accumulate += parseFloat(item.act.data.quantity.split(' ').shift());
                                    amounts.set(item.act.data.to, item.act.data.quantity);

                                }

                            }
                        });
                        this.accumulate += accumulate;
                        console.log(`%c[Bot] Mining success! ${work.account} got ${accumulate.toFixed(4)} TLM. So far you earn ${this.accumulate.toFixed(4)} TLM in total.`, 'color:green');
                        unityInstance.SendMessage('Controller', 'Server_Response_Claim', amounts.get(work.account));
                    }
                    this.isMining = false;
                    success();
                }).catch((err) => {

                    unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', err.message);
                    this.isMining = true;

                    fail();
                });
            });

        });
    }

    async getBalance() {
        return parseFloat((await getBalance(this.id, wax.api.rpc)).split(' ').shift());
    }

    static delay(ms) {
        return new Promise(r => {
            setTimeout(_ => r(), ms)
        });
    }

    static howLongFrom(start){
        start = start.getTime();
        const now = new Date().getTime();
        let diff = (now - start)/1000;
        let result = [];

        if(diff > 86400){
            result.push(Math.floor( diff / 86400 ) + ' days');
            diff %= 86400;
        }
        if(diff > 3600){
            result.push(Math.floor(diff/3600)+ ` hours`);
            diff %= 3600;
        }

        if(diff > 60){
            result.push(Math.floor(diff/60)+ ` minutes`);
            diff %= 60;
        }

        if(diff > 0){
            result.push(diff.toFixed(3)+ ` seconds`);
        }

        return result.join(' ');
    }
}

let bot = new TLMBot();
await bot.start();