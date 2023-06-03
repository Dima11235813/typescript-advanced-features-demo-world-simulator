import { AnimalTypes } from "../world-types/animal.type"
import { WorldOrganism } from "./world-organism.model"

export interface IAnimal extends WorldOrganism<AnimalTypes> {
    numberOfLegs: number
    makeSound(): void
}