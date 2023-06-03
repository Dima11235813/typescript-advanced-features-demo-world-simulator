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
export class Earth extends World {
    worldElements: (BaseAnimal | BasePlant)[] = []
    hourOfDay: number = 0
    hoursInTheDay: number = 24
    worldEventHandler = new EarthWorldEventHandler()

    constructor() {
        super()
        this.setInterval()
        this.name = "Earth"
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
        Object.entries(plantCounts).forEach(c => console.log(`${c[1]} ${c[0]} Plant`))
        Object.entries(animalCounts).forEach(c => console.log(`${c[1]} ${c[0]} Animal`))
    }
    handleDayOver = () => {
        this.worldEventHandler.handleDayOver(this)
    }
}