const EventEmitter = require("events");

const getDate = () => {
    const date = new Date();
    const now = 
     `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `
    +`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`

    return now
}

class Logger extends EventEmitter {
    log(message){
        console.log(message);

        this.emit('messageLogged', { date: getDate(), logged: message });
    }
}

module.exports = Logger;