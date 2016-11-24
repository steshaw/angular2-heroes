import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { HeroSearchService } from './hero-search.service'
import { Hero } from './hero'

@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls: ['hero-search.component.css'],
  providers: [HeroSearchService],
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>
  private searchTerms = new Subject<string>()
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300) // wait for a 300ms pause in events
      .distinctUntilChanged() // ignore if saerch term is the same as the previous value
      .switchMap(term =>
        term? this.heroSearchService.search(term) : Observable.of([])
      )
      .catch((error: any) => {
        // TODO: Better error handling.
        console.log(error)
        return Observable.of([])
      })
  }
  search(term: string): void {
    console.log(`searching for term=[[${term}]]`)
    this.searchTerms.next(term)
  }
}
