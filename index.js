const config=require('./config.json')
const AmiIo = require("ami-io"),
    SilentLogger = new AmiIo.SilentLogger(), //use SilentLogger if you just want remove logs
    amiio = new AmiIo.Client({ logger: SilentLogger,...config.ami });

//Both of this are similar

amiio.on('incorrectServer', function () {
    amiio.logger.error("Invalid AMI welcome message. Are you sure if this is AMI?");
    process.exit();
});
amiio.on('connectionRefused', function(){
    amiio.logger.error("Connection refused.");
    process.exit();
});
amiio.on('incorrectLogin', function () {
    amiio.logger.error("Incorrect login or password.");
    process.exit();
});
amiio.on('event', function(event){
    //amiio.logger.info('event:', event);
    console.log(JSON.stringify(event))
});
amiio.connect();
amiio.on('connected', function(){
    setTimeout(function(){
        amiio.disconnect();
        amiio.on('disconnected', process.exit());
    },30000);
});