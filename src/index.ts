import { Earth } from "./generics-demo";

const newEarth = new Earth()
console.log(`Earth created!`)
const pingInterval = setInterval(() => {
    newEarth.ping()
}, 1000)
// }, newEarth.hoursInTheDay * 1000)