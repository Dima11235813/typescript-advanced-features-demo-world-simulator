import { Earth } from "./earth";

const newEarth = new Earth()
console.log(`Earth created!`)
newEarth.ping()
const pingInterval = setInterval(() => {
    newEarth.ping()
}, 1000)
// TODO: after 18 ticks the calculation chuggs and after tick 19 the heap size is reached tick18:5242950 tick19:10485835
// NOTE: to deal with large number of entities, a solution is to represent groups over X size as 1 element worth X entities.
// An example of this being used is the game risk of rain's elite units that represent and amount of non-elite units.

// }, newEarth.hoursInTheDay * 1000)