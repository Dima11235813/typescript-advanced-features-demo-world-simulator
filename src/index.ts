import { Earth } from "./earth";

const newEarth = new Earth()
console.log(`Earth created!`)
const pingInterval = setInterval(() => {
    newEarth.ping()
}, 10000)