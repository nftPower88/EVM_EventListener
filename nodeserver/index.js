import express from 'express';
import blink from './manager/blinkExample';
//import example from './examples/switchExample';
//import example from './examples/erc20Example';

const PORT = 3030;

let app = new express();
app.set('port', PORT)

app = blink(app);

app.listen(app.get('port'), ()=>{
  console.log(`PI-Node on port ${app.get('port')}`);
})
