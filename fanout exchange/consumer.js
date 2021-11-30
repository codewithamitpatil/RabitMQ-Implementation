
const amqp = require('amqplib');
let uri = '';


// we dont want the queue to be exits
// beacause it takes resources
// and we want to delete this queue 
//once we stop the server
// for that we do
// await channel.assertQueue(queName,{execulsive:true})

const Consumer = async() => {

let exchangeName = "logs";

const connection = await amqp.connect(uri);
const channel  = await connection.createChannel();
await channel.assertExchange(exchangeName,'fanout',{durable:false});
let q = await channel.assertQueue('',{exclusive:true});
console.log(`Genrated queue name ::: ${q.queue}`);
channel.bindQueue(q.queue,exchangeName,'');

channel.consume(q.queue,(msg)=>{
 
  console.log(`Consumed Message ::: ${msg.content.toString()}`);

},{noAck:true});

};

Consumer();
