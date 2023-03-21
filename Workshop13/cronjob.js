const cron = require('node-cron')
const fs = require('fs');



const task = cron.schedule("1-5 * * * * *", () => {

    fs.appendFile('text.file', `hey,updating using cron job sheduler at every 1 
    minute for 5 seconds.\n`, (err) => {
        if (err) {
            console.log(err);
        }
    })

    { scheduled: false }
})


task.start();