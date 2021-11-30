
const amqp = require('amqplib');
let uri = '';

const Sender = async() => {

let input = process.argv.slice(2);
let logType = input[0] || 'error';
let msg = input[1] || 'page not found';
let exchangeName = "dlogs";

const connection = await amqp.connect(uri);
const channel = await connection.createChannel();
await channel.assertExchange(exchangeName,'direct',{durable:false});

console.log(`Message send ::: ${msg}`);
channel.publish(exchangeName,logType,Buffer.from(msg));

setTimeout(()=>{
  connection.close();  
  console.log('connection closed');
  process.exit(0);
},1000);

};

Sender();