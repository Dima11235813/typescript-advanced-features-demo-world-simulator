import { IPlant } from "./world-organism/plant.model"
import { PlantTypes } from "./world-types/plant.type"

export class BasePlant implements IPlant {
    growthFactor = 2
    height = 0
    name: string
    type: PlantTypes
    static getRandomType(): PlantTypes {
        const allTypes = Object.values(PlantTypes)
        const randomNumber = Math.floor(Math.random() * allTypes.length)
        return allTypes[randomNumber]
    }
    constructor(t: PlantTypes, name = "") {
        this.type = t
        this.name = name
    }
    grow(): void {
        this.height += this.growthFactor
    }
}