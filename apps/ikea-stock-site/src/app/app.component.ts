import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  quantity: number
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
  public isLoading: boolean = false;
  store: Todo[] = [];
  public stores = [
    { buCode: '511', name: 'OH, Columbus', coordinates: [-82.998794, 39.961176], countryCode: 'us' },
    { buCode: '175', name: 'OH, West Chester', coordinates: [-84.435081, 39.32155], countryCode: 'us' }
  ];
  public selectedStore = this.stores[0];
  public skuList = '20265438';
  public search = '';

  public input: { productId: string, quantity: number }[] = [];

  constructor(private http: HttpClient) { }

  getQuantity(productId): number {
    return this.input.find(item => item.productId === productId).quantity;
  }

  getTotal() {
    let total = 0;
    this.store.forEach(item => total += item.quantity * item.extraData.priceNumeral);
    return total;
  }

  getTotalItems() {
    let total = 0;
    this.store.forEach(item => total += +item.quantity);
    return total;
  }

  fetch() {
    this.isLoading = true;
    this.input.length = 0;
    this.store.length = 0;

    let m;
    const regex = /\s*([\d]{6,})\s*([^\$]+)\$([^\s]+)\s*([^\s]+)\s*\$([^\s]+)/gm;

    while ((m = regex.exec(this.skuList)) !== null) {
      if (m.index === regex.lastIndex) { regex.lastIndex++; }

      const currentInput = this.input.findIndex(i => i.productId === m[1]);
      if (currentInput === -1) {
        this.input.push({ productId: m[1], quantity: parseInt(m[4]) });
      } else {
        this.input[currentInput].quantity += parseInt(m[4]);
      }
    }
    if (this.input.length === 0) {
      const regex = /[0-9]{8,}/gmi;
      let m;

      while ((m = regex.exec(this.skuList)) !== null) {
        if (m.index === regex.lastIndex) { regex.lastIndex++; }
        const currentInput = this.input.findIndex(i => i.productId === m[0]);
        if (currentInput === -1) {this.input.push({ productId: m[0], quantity: 0 });}
      }
    }
    const promises = [];

    this.http.post<Todo[]>('/api/todos', { data: this.input, store: this.selectedStore })
      .subscribe(data => {
        this.isLoading = false;
        return this.store = data;
      });

  }


}
