import { PlantTypes } from "../world-types/plant.type"
import { IWorldOrganism } from "./world-organism.model"

export interface IPlant extends IWorldOrganism<PlantTypes> {
    growthFactor: number
    grow(): void
}
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