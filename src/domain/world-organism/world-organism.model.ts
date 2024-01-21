export interface IWorldOrganism<T> {
    name: string
    type: T
}
export abstract class WorldOrganism {
    // static getRandomType<T>(): T {
    //     const allTypes = Object.values(T as Array)
    //     if(Array.isArray(Object.values(T))){
    //         const randomNumber = Math.floor(Math.random() * allTypes.length)
    //         return allTypes[randomNumber]
    //     }else{

    //         throw Error(`T passed to getRandomType isn't an enum`)
    //     }
    // }
}   