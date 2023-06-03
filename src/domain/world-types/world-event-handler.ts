import { Earth } from "../../earth"
import { BaseAnimal } from "../animal"
import { BasePlant } from "../plant"
import { World } from "./world.type"

export interface IWorldEventHandler {
    handleDayOver(world: World): void
    addWorldElement<T>(t: T, world: World): void
}
export class EarthWorldEventHandler implements IWorldEventHandler {

    /** Every day add new animals */
    handleDayOver = (world: World) => {
        if (!world) {
            throw new Error(`World not defined!`)
        }
        if (world instanceof Earth) {
            //Every day add 10 animals and 50 plants
            new Array(10).fill(0).forEach(_ => this.addWorldElement(new BaseAnimal(BaseAnimal.getRandomType()), world))
            new Array(5).fill(0).forEach(_ => this.addWorldElement(new BasePlant(BasePlant.getRandomType()), world))
        }
        //At the end of each day check if each animal has reached it's reproduction cycle TODO Implement constraints in terms of coupling and proximity
        world.worldElements.forEach(e => {
            if (e instanceof BaseAnimal && world.days % e.reproductionCycle === 0) {
                e.reproduce(world)
            }
            e instanceof BasePlant ? e.grow() : null
        })
    }
    /** Handles adding a plant or animal to the passed in world */
    addWorldElement<T>(t: T, world: World) {
        if (t instanceof BaseAnimal) {
            world.worldElements.push(t)
        } else if (t instanceof BasePlant) {
            world.worldElements.push(t)
        }
    }
}