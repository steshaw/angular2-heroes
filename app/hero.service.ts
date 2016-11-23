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
    // return Promise.resolve(mockHeroes)
    return this.delay(3000).then(() => mockHeroes)
  }
}