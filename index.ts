#! usr/bin/env node
import inquirer from "inquirer"

import {differenceInSeconds} from "date-fns"

const response = await inquirer.prompt([
    {
        name : "userTime",
        type : "number",
        message : "please enter a second",
        validate : (input)=>{
            if(isNaN(input)){
                return "please enter valid number";
            } else if (input > 60){
                return "seconds must be in 60";
            } else {
                return true
            }
        }
    }
]);

let input = response.userTime;

function startTime(value : number){
    const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(initialTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime,currentTime);

        if(timeDifference <= 0){
            console.log("Timer has expired");
            process.exit()
        }
        const minute = Math.floor((timeDifference%(3600 *24))/3600);
        const second = Math.floor(timeDifference%60);
        console.log(`${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`);

    }),1000);
};
startTime(input)
