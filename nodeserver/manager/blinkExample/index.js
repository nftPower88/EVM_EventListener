import RpiLeds from 'rpi-leds';
import Web3 from 'web3';

//import gpio from 'rpi-gpio';
import gpio from 'gpio';

/* import moralis */
const Moralis = require("moralis").default;
/* Moralis init code */
const serverUrl = "YOUR-SERVER-URL";
const appId = "YOUR-APP-ID";
const masterKey = "9qOJzpS1JAiQmzZZ3y359sFoG7RC6hVuyaSnw42fJztSWKZV0VeoxOc2n8wb87WH";

export default (app) => {
  console.log("Hi blinkExample")
  // const leds = new RpiLeds();
  // const web3 = new Web3();
  // web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

  // // var coinbase = web3.eth.coinbase;
  // // var balance = web3.eth.getBalance(coinbase);

  // var contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  // var ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"retData","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"inData","type":"uint256"}],"name":"setData","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"msgData","type":"uint256"}],"name":"blinkEvent","type":"event"}]');

  // const blinkContract = web3.eth.contract(ABI).at(contractAddress);

  async function handler() {
    // reads the api key from .env.local and starts Moralis SDK
    
    await Moralis.start({ apiKey: masterKey });

    const address = '0x3D79027e52bcf4b9A32bb364Ec7788C71325d0db';

    // Promise.all() for receiving data async from two endpoints
    const [nativeBalance, tokenBalances] = await Promise.all([
        Moralis.EvmApi.account.getNativeBalance({ address }),
        Moralis.EvmApi.account.getTokenBalances({ address }),
    ]);
    console.log({
        // formatting the output
        nativeBalance: nativeBalance.result.balance.ether,
        tokenBalances: tokenBalances.result.map((token) => token.display()),
    });

    const ABI = {
      anonymous: false,
      inputs: [
        { indexed: true, name: "from", type: "address" },
        { indexed: false, internalType: "uint256", name: "data", type: "uint256" }
      ],
      name: "blinkEvent",
      type: "event",
    };
    
    const options = {
      chain: "local",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      limit: "3",
      abi: ABI,
    };
    const events = await Moralis.EvmApi.native.getContractEvents(options);
  }

  handler()

  // blinkContract.blinkEvent.watch((error, msg)=> {
  //   console.log("b")
  //   if(!error) {
  //     console.log(msg);
  //     app.blinkLeds();
  //   } else {
  //     console.log(error);
  //   }
  // });

  // app.blinkLeds = () => {
  //   app.ledStatus = false;
  //   let iv = setInterval(()=>{
  //     if(app.ledStatus) {
  //       console.log("sleepy.. so sleepy")
  //       leds.power.turnOff();
  //       leds.status.turnOff();
  //     } else {
  //       console.log("turn on!")
  //       leds.power.turnOn();
  //       leds.status.turnOn();
  //     }
  //     app.ledStatus = !app.ledStatus;
  //   }, 500);

  //   setTimeout(()=>{
  //     clearInterval(iv);
  //   }, 10000)
  // }

  return app;
}
