import { Earth } from "./generics-demo";

const newEarth = new Earth()
console.log(`Earth created!`)
const pingInterval = setInterval(() => {
    newEarth.ping()
}, 10000)
// }, newEarth.hoursInTheDay * 1000)