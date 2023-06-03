import { IAnimal } from "./world-organism/animal.model"
import { AnimalTypes } from "./world-types/animal.type"
import { World } from "./world-types/world.type"

export class BaseAnimal implements IAnimal {
    /** In days */
    reproductionCycle = 24
    numberOfLegs: number = 0
    age: number
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
    }
    reproduce = (world: World) => {
        const newAnimal = new BaseAnimal(this.type, `${this.name}'s child`)
        world.worldEventHandler.addWorldElement(newAnimal, world)
    }
    makeSound(): void {

    }
}