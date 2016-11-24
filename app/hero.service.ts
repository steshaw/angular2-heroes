import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import { Hero } from './hero'
import { mockHeroes } from './mock-heroes'

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes' // URL to API
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  constructor(private http: Http) {}
  delay<T>(duration: number): Promise<T> {
    return new Promise<T>(resolve =>
      setTimeout(resolve, duration)
    )
  }
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError)
  }
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl,
            JSON.stringify({name: name}),
            {headers: this.headers})
      .toPromise()
      .then(result => result.json().data)
      .catch(this.handleError)
  }
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error) // TODO: demo purposes only
    return Promise.reject(error.message || error)
  }
  getHeroesFake(): Promise<Hero[]> {
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