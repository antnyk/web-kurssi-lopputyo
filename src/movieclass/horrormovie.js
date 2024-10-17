//importing Movie class
import Movie from './movie.js'

class HorrorMovie extends Movie {
    #scary

    constructor(name, director, scary){
        super(name, director)
        this.#scary = scary
    }

    get scary(){
        return this.#scary
    }

    set scary(isItScary) {
        this.#scary = isItScary
    }
}

const horrorBMovie = new HorrorMovie('Scooyb', 'Scary Dude', true)

console.log(horrorBMovie.name)
console.log(horrorBMovie.director)
console.log(horrorBMovie.scary)

horrorBMovie.scary = false

console.log(horrorBMovie.scary)