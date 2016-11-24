import { Injectable } from '@angular/core'
import { Hero } from './hero'
import { mockHeroes } from './mock-heroes'

@Injectable()
export class HeroService {
  delay<T>(duration: number): Promise<T> {
    return new Promise<T>(resolve =>
      setTimeout(resolve, duration)
    )
  }
  getHeroes(): Promise<Hero[]> {
    const delayMillis = 1000
    if (delayMillis === 0) {
      return Promise.resolve(mockHeroes)
    } else {
      return this.delay(delayMillis).then(() => mockHeroes)
    }
  }
  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heros =>
      heros.find(hero => hero.id === id)
    )
  }
}