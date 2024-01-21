import { AnimalTypes } from "../world-types/animal.type"
import { IWorldOrganism } from "./world-organism.model"

export interface IAnimal extends IWorldOrganism<AnimalTypes> {
    numberOfLegs: number
    makeSound(): void
}