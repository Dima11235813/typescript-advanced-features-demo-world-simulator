import { BaseAnimal } from "../animal"
import { BasePlant } from "../plant"
import { EarthWorldEventHandler } from "./world-event-handler"

export abstract class World {
    name: string = ""
    timeInterval: NodeJS.Timeout | null = null
    days: number = 1
    abstract worldEventHandler: EarthWorldEventHandler
    abstract worldElements: (BaseAnimal | BasePlant)[]
    abstract handleDayOver: Function
    abstract hoursInTheDay: number
    //Number of seconds on earth is one hour in this world
    abstract hourOfDay: number
    /** Must call set interval to start world after - Every interval in this case a second is an hour on this planet */
    setInterval = () => {
        this.timeInterval = setInterval(() => {
            this.timetick()
            this.handleDayOver()
        }, 1000)
    }
    timetick = (): void => {
        if (this.hourOfDay < this.hoursInTheDay) {
            this.hourOfDay += 1
        } else {
            this.days += 1
            this.hourOfDay = 0
        }
    }
}