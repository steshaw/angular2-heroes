import { InMemoryDbService } from 'angular-in-memory-web-api'
import { mockHeroes } from './mock-heroes'

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      "heroes": mockHeroes
    }
  }
}