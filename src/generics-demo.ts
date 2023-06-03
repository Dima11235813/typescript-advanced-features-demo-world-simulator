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
}

export interface IPlant extends WorldOrganism<PlantTypes> {

}
// export interface AnimalAction{
// }

export class BaseAnimal implements IAnimal {
    numberOfLegs: number = 0
    constructor(
        public type: AnimalTypes,
        public name = "") {
    }
    makeSound(): void {
        console.log(`Sound that ${this.type} makes`)
    }
}
export class BasePlant implements IPlant {
    name: string
    type: PlantTypes
    constructor(t: PlantTypes, name = "") {
        this.type = t
        this.name = name
    }
    grow(): void {
        console.log(`Grow tree ${this.name}`)
    }
}

export abstract class World {
    name: string = ""
    timeInterval: NodeJS.Timeout | null = null
    days: number = 1
    abstract worldElements: (BaseAnimal | BasePlant)[]
    abstract handleDayOver: Function
    abstract hoursInTheDay: number
    //Number of seconds on earth is one hour in this world
    abstract hourOfDay: number
}
export class WorldEventHandler {

    handleDayOver = (world: World) => {
        if (!world) {
            throw new Error(`World not defined!`)
        }
        console.log(`Another day on ${world.name}, another salmon for the ocean, another dino on the ground`)
        if (world instanceof Earth) {
            world.addWorldElement(new BaseAnimal(AnimalTypes.fish, "salmon"))
            world.addWorldElement(new BaseAnimal(AnimalTypes.dinosaur, "t-rex"))
        }

    }
}
export class Earth extends World {
    worldElements: (BaseAnimal | BasePlant)[] = []
    hourOfDay: number = 0
    hoursInTheDay: number = 24
    worldEventHandler: WorldEventHandler

    constructor() {
        super()
        this.worldEventHandler = new WorldEventHandler()
        const myDino = new BaseAnimal(AnimalTypes.dinosaur, "Stegasouraus")
        const myTree = new BasePlant(PlantTypes.evergreen, "Spruce")
        // this.addWorldElement(myDino)
        this.addWorldElement(myTree)
        this.setInterval()
    }
    /** Must call set interval to start world after - Every interval in this case a second is an hour on this planet */
    setInterval = () => {
        console.log(`setInterval to 1000`)
        this.timeInterval = setInterval(() => this.handleIntervalInternally(), 1000)
    }
    cleanUp = () => {
        this.timeInterval ? clearInterval(this.timeInterval) : null
    }
    handleIntervalInternally = () => {
        console.log(`handleIntervalInternally and invoke callback passed in constructor`)
        this.timetick()
        this.handleDayOver()
    }
    timetick = (): void => {
        if (this.hourOfDay < this.hoursInTheDay) {
            this.hourOfDay += 1
        } else {
            this.days += 1
            this.hourOfDay = 0
        }
    }
    // handleDayOver = () => {
    //     this.worldEventHandler.handleDayOver(this)
    // }

    ping = () => {
        // this.worldElements.forEach(we => console.log(`World Elment Name: ${we.name} Type: ${we.type}`))
        // let animalCounts: Record<AnimalTypes, number> = Object.entries(AnimalTypes).reduce((accum, curr) => ({
        //     ...accum,
        //     [curr[0]]: curr[1]
        // }), {} as Record<AnimalTypes, number>)
        // let plantCounts: Record<PlantTypes, number> = Object.entries(PlantTypes).reduce((accum, curr) => ({
        //     ...accum,
        //     [curr[0]]: curr[1]
        // }), {} as Record<PlantTypes, number>)
        // hours in the day ${this.hoursInTheDay}
        console.log(`
            EARTH DAY ${super.days}
            hour of the day ${this.hourOfDay}
            this.worldElement ${this.worldElements.length}
        `)
        // Object.entries(plantCounts).forEach(c => console.log(`${c[1]} Plants ${c[0]}`))
        // Object.entries(animalCounts).forEach(c => console.log(`${c[1]} Animals ${c[0]}`))
    }
    handleDayOver = () => {
        console.log(`Another day on ${this.name}, another salmon for the ocean, another dino on the ground`)
        if (this instanceof Earth) {
            this.addWorldElement(new BaseAnimal(AnimalTypes.fish, "salmon"))
            this.addWorldElement(new BaseAnimal(AnimalTypes.dinosaur, "t-rex"))
        }

    }
    addWorldElement<T>(t: T) {
        if (t instanceof BaseAnimal) {
            t.makeSound()
            this.worldElements.push(t)
        } else if (t instanceof BasePlant) {
            t.grow()
            this.worldElements.push(t)
        }
    }
}