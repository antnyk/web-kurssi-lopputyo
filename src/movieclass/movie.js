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

let assholeBook = new Movie('Cocks and balls', 'Mike Dicker')

console.log(assholeBook.director)
console.log(assholeBook.name)

assholeBook.name = 'Movie movie movie'

console.log(assholeBook.name)

export default Movie