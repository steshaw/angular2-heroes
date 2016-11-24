import { RouterModule } from '@angular/router'

import { HeroesComponent } from './heroes.component'
import { DashboardComponent } from './dashboard.component'
import { HeroDetailComponent } from './hero-detail.component'

export const routes = RouterModule.forRoot([{
  path: 'heroes',
  component: HeroesComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
{
  path: 'hero/:id',
  component: HeroDetailComponent
}])
