import { BaseAnimal } from "./domain/animal"
import { BasePlant } from "./domain/plant"
import { AnimalTypes } from "./domain/world-types/animal.type"
import { PlantTypes } from "./domain/world-types/plant.type"
import { EarthWorldEventHandler } from "./domain/world-types/world-event-handler"
import { World } from "./domain/world-types/world.type"

export class Earth extends World {
    worldElements: (BaseAnimal | BasePlant)[] = []
    hourOfDay: number = 0
    hoursInTheDay: number = 24
    worldEventHandler = new EarthWorldEventHandler()

    constructor() {
        super()
        this.setInterval()
        this.name = "Earth"
    }
    cleanUp = () => {
        this.timeInterval ? clearInterval(this.timeInterval) : null
    }

    ping = () => {
        let animalCounts: Record<AnimalTypes, number> = Object.entries(AnimalTypes).reduce((accum, curr) => ({
            ...accum,
            [curr[0]]: 0
        }), {} as Record<AnimalTypes, number>)
        let plantCounts: Record<PlantTypes, number> = Object.entries(PlantTypes).reduce((accum, curr) => ({
            ...accum,
            [curr[0]]: 0
        }), {} as Record<PlantTypes, number>)
        this.worldElements.forEach((e) => {
            if (e instanceof BaseAnimal) {
                animalCounts[e.type] += 1
            } else if (e instanceof BasePlant) {
                plantCounts[e.type] += 1
            }
        })
        console.log(`
            EARTH DAY ${this.days}
            hour of the day ${this.hourOfDay}
            this.worldElement ${this.worldElements.length}
        `)
        Object.entries(plantCounts).forEach(c => console.log(`${c[1]} ${c[0]} Plant`))
        Object.entries(animalCounts).forEach(c => console.log(`${c[1]} ${c[0]} Animal`))
    }
    handleDayOver = () => {
        this.worldEventHandler.handleDayOver(this)
    }
}