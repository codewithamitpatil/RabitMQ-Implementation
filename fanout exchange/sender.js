
const amqp = require('amqplib');
let uri = '';


const Sender = async()=>{

let exchangeName = "logs";
let msg = process.argv.slice(2).join(' ') || 'Hello from Vaishanvi';

const connection = await amqp.connect(uri);
const channel = await connection.createChannel();
await channel.assertExchange(exchangeName,'fanout',{durable:false});

channel.publish(exchangeName,'',Buffer.from(msg));
console.log(`Sended Message ::: ${msg}`);

setTimeout(()=>{

 channel.close();
 console.log('connection closed');
 process.exit(0);

},1000);

};

Sender();