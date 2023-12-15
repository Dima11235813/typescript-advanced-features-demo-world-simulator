import { Earth, EarthOrganismTypes } from "../../earth"
import { BaseAnimal } from "../world-organism/animal.model"
import { BasePlant } from "../world-organism/plant.model"
import { WorldOrganism } from "../world-organism/world-organism.model"
import { World } from "./world.type"


export interface IWorldEventHandler<W> {
    handleDayOver(world: W): void
    addWorldElement(t: WorldOrganism, world: W): void
}
export class EarthWorldEventHandler<W extends Earth> implements IWorldEventHandler<W> {
    /** Every day add new animals */
    handleDayOver = (world: W) => {
        if (!world) {
            throw new Error(`World not defined!`)
        }
        if (world instanceof Earth) {
            //Every day add 10 animals and 50 plants ** is this adding 10 and 5?
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
    addWorldElement(t: EarthOrganismTypes, world: Earth) {
        world.add(t);
    }

}