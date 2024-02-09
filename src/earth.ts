import { BaseAnimal, IAnimal } from "./domain/world-organism/animal.model"
import { BasePlant, IPlant } from "./domain/world-organism/plant.model"
import { WorldOrganism } from "./domain/world-organism/world-organism.model"
import { AnimalTypes } from "./domain/world-types/animal.type"
import { PlantTypes } from "./domain/world-types/plant.type"
import { EarthWorldEventHandler } from "./domain/world-types/world-event-handler"
import { World } from "./domain/world-types/world.type"

export type EarthOrganismTypes = BaseAnimal | BasePlant

export class Earth extends World<EarthWorldEventHandler<Earth>> {
    add(t: EarthOrganismTypes) {
        if (t instanceof BaseAnimal) {
            // console.log("I was born")
        } else if (t instanceof BasePlant) {
            // console.log("I germinated")
        }
        const [x,y] = this.getRandEmpty()
        t.coord = [x,y]
        this.map[x][y] = t
        this.population += 1;
        this.worldElements.push(t)
    }
    worldElements: EarthOrganismTypes[] = []
    hourOfDay: number = 0
    hoursInTheDay: number = 24
    worldEventHandler = new EarthWorldEventHandler()
    days: number = 0
    constructor() {
        super()
        this.setInterval()
        this.name = "Earth"
    }
    cleanUp = () => {
        this.timeInterval ? clearInterval(this.timeInterval) : null
    }

    ping = () => {
        let totalAnimals = 0
        let totalPlants = 0
        // Creates a Record of all AnimalTypes/PlantTypes and sets their count to 0
        let animalCounts: Record<AnimalTypes, number> = Object.entries(AnimalTypes).reduce((accum, curr) => ({
            ...accum,
            [curr[0]]: 0
        }), {} as Record<AnimalTypes, number>)
        let plantCounts: Record<PlantTypes, number> = Object.entries(PlantTypes).reduce((accum, curr) => ({
            ...accum,
            [curr[0]]: 0
        }), {} as Record<PlantTypes, number>)
        // counts each instance of AnimalTypes and PlantTypes
        this.worldElements.forEach((e) => {
            if (e instanceof BaseAnimal) {
                animalCounts[e.type] += 1
                totalAnimals++
            } else if (e instanceof BasePlant) {
                plantCounts[e.type] += 1
                totalPlants++
            }
        })
        console.log(`
            EARTH DAY ${this.days}
            hour of the day ${this.hourOfDay}
            this.worldElement ${this.worldElements.length}
        `)
        console.log(`${totalAnimals} Animals`)
        console.log(`${totalPlants} Plants`)
        // Object.entries(plantCounts).forEach(c => console.log(`${c[1]} ${c[0]} Plant`))
        // Object.entries(animalCounts).forEach(c => console.log(`${c[1]} ${c[0]} Animal`))
    }
    handleDayOver = () => {
        this.worldEventHandler.handleDayOver(this)
    }
}