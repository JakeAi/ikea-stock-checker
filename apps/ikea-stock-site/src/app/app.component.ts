import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, merge } from 'rxjs';
import { ExtraData } from './interface';


interface Store {
  buCode: string
  coordinates: [number, number]
  countryCode: string
  name: string
}

interface Forecast {
  stock: number
  date: string
  probability: string

}

interface Todo {
  buCode: string,
  productId: string
  createdAt: string
  forecast: Forecast[]
  probability: string
  restockDate: string
  stock: string
  productName: string
  extraData: ExtraData
}

@Component({
  selector: 'ikea-stock-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  store: Todo[] = [];
  public stores = [
    { buCode: '511', name: 'OH, Columbus', coordinates: [-82.998794, 39.961176], countryCode: 'us' },
    { buCode: '175', name: 'OH, West Chester', coordinates: [-84.435081, 39.32155], countryCode: 'us' }
  ];
  public selectedStore = this.stores[0];
  public skuList = '20265438';

  constructor(private http: HttpClient) { }


  fetch() {

    const matches = [];
    const regex = /[A-Z]{0,1}[0-9]{6,}/gmi;
    let m;

    while ((m = regex.exec(this.skuList)) !== null) {
      if (m.index === regex.lastIndex) { regex.lastIndex++; }
      m.forEach((match, groupIndex) => matches.push(match));
    }

    this.skuList = matches.join('\n');
    this.store.length = 0;
    const promises = [];

    const removedDuplicates = [...new Set(matches)]
    removedDuplicates.forEach(line => promises.push(this.http.post<Todo>('/api/todos', { data: line, store: this.selectedStore })));
    concat(...promises).subscribe((data: Todo) => {
      if (data?.productId) {
        this.store.push(data);
        this.store.sort((a, b) => (a.stock < b.stock) ? 1 : -1);
      }
    });
  }


}
