import { Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {

  card: any;
  banner: any[] = [];
  images = [1055, 194, 368, 129, 217].map((n) => `https://picsum.photos/id/${n}/1500/500`);

  constructor(private generalService: GeneralService, private router: Router) {
    this.card = JSON.parse(localStorage.getItem('news') || '{}');
  }

  ngOnInit(): void {
    this.getBannerNews();
  }

  getBannerNews(): void {
    const map = new Map<string, string>();
    map.set('limit', '2');
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
