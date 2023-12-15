import { PlantTypes } from "../world-types/plant.type"
import { WorldOrganism } from "./world-organism.model"

export interface IPlant extends WorldOrganism {
    growthFactor: number
    grow(): void
}
export class BasePlant implements IPlant {
    growthFactor = 2
    height = 0
    coord: [number, number]
    name: string
    type: PlantTypes
    planet: string
    static getRandomType(): PlantTypes {
        const allTypes = Object.values(PlantTypes)
        const randomNumber = Math.floor(Math.random() * allTypes.length)
        return allTypes[randomNumber]
    }
    constructor(t: PlantTypes, name = "") {
        this.type = t
        this.name = name
        this.coord = [0,0]
        this.planet = "default"
    }
    grow(): void {
        this.height += this.growthFactor
    }
}