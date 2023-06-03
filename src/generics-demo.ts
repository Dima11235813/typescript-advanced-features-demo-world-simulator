export enum AnimalTypes {
    bird = 'bird',
    fish = 'fish',
    dinosaur = 'dinosaur'
}
export enum PlantTypes {
    evergreen = 'evergreen',
    decidiuous = 'decidiuous'
}
export interface WorldOrganism<T> {
    name: string
    type: T
}
export interface IAnimal extends WorldOrganism<AnimalTypes> {
    numberOfLegs: number
    makeSound(): void
}

export interface IPlant extends WorldOrganism<PlantTypes> {
    growthFactor: number
    grow(): void
}
// export interface AnimalAction{
// }

export class BaseAnimal implements IAnimal {
    /** In days */
    reproductionCycle = 24
    numberOfLegs: number = 0
    age: number
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
export class BasePlant implements IPlant {
    growthFactor = 2
    height = 0
    name: string
    type: PlantTypes
    constructor(t: PlantTypes, name = "") {
        this.type = t
        this.name = name
    }
    grow(): void {
        this.height += this.growthFactor
    }
}

export abstract class World {
    name: string = ""
    timeInterval: NodeJS.Timeout | null = null
    days: number = 1
    abstract worldEventHandler: EarthWorldEventHandler
    abstract worldElements: (BaseAnimal | BasePlant)[]
    abstract handleDayOver: Function
    abstract hoursInTheDay: number
    //Number of seconds on earth is one hour in this world
    abstract hourOfDay: number
    /** Must call set interval to start world after - Every interval in this case a second is an hour on this planet */
    setInterval = () => {
        this.timeInterval = setInterval(() => {
            this.timetick()
            this.handleDayOver()
        }, 1000)
    }
    timetick = (): void => {
        if (this.hourOfDay < this.hoursInTheDay) {
            this.hourOfDay += 1
        } else {
            this.days += 1
            this.hourOfDay = 0
        }
    }
}
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
            this.addWorldElement(new BaseAnimal(AnimalTypes.fish), world)
            this.addWorldElement(new BaseAnimal(AnimalTypes.dinosaur), world)
        }
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
export class Earth extends World {
    worldElements: (BaseAnimal | BasePlant)[] = []
    hourOfDay: number = 0
    hoursInTheDay: number = 24
    worldEventHandler = new EarthWorldEventHandler()

    constructor() {
        super()
        this.setInterval()
        const myDino = new BaseAnimal(AnimalTypes.dinosaur, "Stegasouraus")
        const myTree = new BasePlant(PlantTypes.evergreen, "Spruce")
        this.name = "Earth"
        this.worldEventHandler.addWorldElement(myDino, this)
        this.worldEventHandler.addWorldElement(myTree, this)
    }
    cleanUp = () => {
        this.timeInterval ? clearInterval(this.timeInterval) : null
    }

    ping = () => {
        let animalCounts: Record<AnimalTypes, number> = Object.entries(AnimalTypes).reduce((accum, curr) => ({
            ...accum,
            [curr[0]]: 0
        }), {} as Record<AnimalTypes, number>)
        let plantCounts: Record<PlantTypes, number> = Object.entries(PlantTypes).reduce((accum, curr) => ({
            ...accum,
            [curr[0]]: 0
        }), {} as Record<PlantTypes, number>)
        this.worldElements.forEach((e) => {
            if (e instanceof BaseAnimal) {
                animalCounts[e.type] += 1
            } else if (e instanceof BasePlant) {
                plantCounts[e.type] += 1
            }
        })
        console.log(`
            EARTH DAY ${this.days}
            hour of the day ${this.hourOfDay}
            this.worldElement ${this.worldElements.length}
        `)
        Object.entries(plantCounts).forEach(c => console.log(`${c[1]} Plants ${c[0]}`))
        Object.entries(animalCounts).forEach(c => console.log(`${c[1]} Animals ${c[0]}`))
    }
    handleDayOver = () => {
        this.worldEventHandler.handleDayOver(this)
    }
}