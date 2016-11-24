import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Hero } from './hero'
import { HeroService } from './hero.service'

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  styleUrls: ['heroes.component.css'],
  templateUrl: 'heroes.component.html'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[]
  selectedHero: Hero
  constructor(
    private router: Router,
    private heroService: HeroService,
  ) {}
  ngOnInit(): void {
    this.getHeroes()
  }
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes =>
      this.heroes = heroes
    )
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }
  gotoDetail(): void {
    this.router.navigate(['/hero', this.selectedHero.id])
  }
  add(name: string): void {
    name = name.trim()
    if (!name) return
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero)
        this.selectedHero = undefined
      })
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero)
        if (this.selectedHero === hero) {
          this.selectedHero = undefined
        }
      })
  }
}
