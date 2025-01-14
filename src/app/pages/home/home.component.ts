import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  showNavigationArrows = false;
	showNavigationIndicators = false;
	images = [1055, 194, 368, 129, 217].map((n) => `https://picsum.photos/id/${n}/1500/500`);
  news: any[] = [];
  banner: any[] = [];

	constructor(config: NgbCarouselConfig, private generalService: GeneralService, private router: Router) {
		// customize default values of carousels used by this component tree
		config.showNavigationArrows = true;
		config.showNavigationIndicators = true;
	}
  ngOnInit(): void {
    this.getNews();
    this.getBannerNews();
  }

  getNews(): void {
    const map = new Map<string, string>();
    map.set('limit', '6');
    map.set('access_key', '886a9784909e845b207d173e799c46de');
    this.generalService.getWithParams('/news', map).then((response: any) => {
      this.news = response.data;
    });
  }

  getBannerNews(): void {
    const map = new Map<string, string>();
    map.set('limit', '3');
    map.set('access_key', '886a9784909e845b207d173e799c46de');
    this.generalService.getWithParams('/news', map).then((response: any) => {
      this.banner = response.data;
    });
  }

  clickCard(news: any, index: number): void {
    if(news.image == null) news.image = this.images[index];
    localStorage.setItem('news', JSON.stringify(news));
    this.router.navigate(['/news/1']);
  }

}
