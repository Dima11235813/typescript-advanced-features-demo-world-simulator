import { WorldOrganism } from "../world-organism/world-organism.model"
import { EarthWorldEventHandler, IWorldEventHandler } from "./world-event-handler"

export abstract class World<EV> {
    
    name: string = ""
    timeInterval: NodeJS.Timeout | null = null
    days: number = 1
    population: number = 0
    populationLimit: number = 200000
    map!: WorldOrganism[][] // I think we don't need to wrap O in WorldOrganism
    occupiedCoords = {}
    static MAP_DEFAULT_WIDTH = 100
    static MAP_DEFAULT_HEIGHT = 100
    abstract worldEventHandler: EV
    abstract worldElements: WorldOrganism[]
    abstract handleDayOver: Function
    abstract hoursInTheDay: number
    //Number of seconds on earth is one hour in this world
    abstract hourOfDay: number
    constructor() {
        this.map = new Array(World.MAP_DEFAULT_WIDTH).fill(new Array(World.MAP_DEFAULT_HEIGHT))
    }
    getRandEmpty() {
        const x = Math.floor(Math.random() * 100)
        const y = Math.floor(Math.random() * 100)
        return [x,y]
    }
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