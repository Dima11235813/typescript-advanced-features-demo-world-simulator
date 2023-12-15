import { Earth } from "../../earth"
import { AnimalTypes } from "../world-types/animal.type"
import { WorldOrganism } from "./world-organism.model"

export interface IAnimal extends WorldOrganism {
    numberOfLegs: number
    makeSound(): void
}

export class BaseAnimal implements IAnimal {
    /** In days */
    reproductionCycle = 24
    numberOfLegs: number = 0
    age: number
    coord = null
    planet: string;
    // getRandomType<T>():T{

    // }
    /** TODO Create a generic version of this as in */
    static getRandomType(): AnimalTypes {
        const allTypes = Object.values(AnimalTypes)
        const randomNumber = Math.floor(Math.random() * allTypes.length)
        return allTypes[randomNumber]
    }
    constructor(
        public type: AnimalTypes,
        public name = "") {
        this.age = 1
        this.planet = "default"
    }
    reproduce = (world: Earth) => {
        const newAnimal = new BaseAnimal(this.type, `${this.name}'s child`)
        world.worldEventHandler.addWorldElement(newAnimal, world)
    }
    makeSound(): void {

    }
}