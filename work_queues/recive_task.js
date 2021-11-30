
const amqp = require('amqplib');
let uri = '';


const ReciveTask = async() => {

let queName ="hello1";

const connection = await amqp.connect(uri);
const channel    = await connection.createChannel();
await channel.assertQueue(queName,{durable:true});
channel.prefetch(1); // dont send next message before previous is completed

channel.consume(queName,(msg)=>{
  
    let secs = msg.content.toString().split('.').length - 1 ;
    console.log(secs);
    console.log('Recived Msg',msg.content.toString());
 
    setTimeout(()=>{
        console.log('task done successfully');
        channel.ack(msg);

      },secs * 1000);

},{noAck:false});

861495042977488
};

ReciveTask();


// always acnokledge manaually to dont lack the message