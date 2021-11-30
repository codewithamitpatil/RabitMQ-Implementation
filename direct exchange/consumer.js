
const amqp = require('amqplib');
let uri = '';


const Consumer = async() => {

let exchangeName = "dlogs";
let logType = process.argv.slice(2) || ['error','info'];

const connection = await amqp.connect(uri);
const channel = await connection.createChannel();
await channel.assertExchange(exchangeName,'direct',{durable:false});

let q = await channel.assertQueue('',{exclusive:true});

console.log(`Genrated queue name ::: ${q.queue}`);

logType.forEach((item)=>{
    console.log(item)
    channel.bindQueue(q.queue,exchangeName,item);
});

 channel.consume(q.queue,(msg)=>{
   console.log(`Message Recived ::: ${msg.content.toString()}`);
 },{noAck:true});

};

Consumer();