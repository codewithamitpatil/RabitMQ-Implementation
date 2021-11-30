const amqp = require('amqplib');
let uri = '';


const SendTask = async() => {

 let queName = "hello1";
 let msg = process.argv.slice(2).join(' ') || "hello amit";
  
 const connection = await amqp.connect(uri);
 const channel = await connection.createChannel();
 await channel.assertQueue(queName,{durable:true});

 channel.sendToQueue(queName,Buffer.from(msg),{persistent:true});

 setTimeout(()=>{
    connection.close();
    console.log('connection closed');
 },1000);  


};


SendTask();