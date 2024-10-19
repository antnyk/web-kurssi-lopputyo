class Movie {
    #name
    #director

    constructor(name, director){
        this.#name = name
        this.#director = director
    }

    get name(){
        return this.#name 
    }

    get director(){
        return this.#director
    }

    set name(newName){
        this.#name = newName
    }

    set director(newdirector){
        this.#director = newdirector
    }
}

let badBook = new Movie('Horrible', 'Mike Dicker')

console.log(badBook.director)
console.log(badBook.name)

badBook.name = 'Movie movie movie'

console.log(badBook.name)

export default Movie