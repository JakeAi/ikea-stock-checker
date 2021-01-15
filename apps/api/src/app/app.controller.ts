import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import checker from 'ikea-availability-checker';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('todos')
  async getData(
    @Body('data') input: { productId: string, quantity: number }[],
    @Body('store') store: any
  ) {
    const data = [];
    for (const body of input) {
      const { productId, quantity } = body;
      const lastThree = productId.split('').slice(productId.length - 3, productId.length).join('');
      const extraData = await axios.get(`https://www.ikea.com/us/en/products/${lastThree}/${productId}.json`);
      const result = await checker.availability(store.buCode, productId);
      result.extraData = extraData.data;
      result.quantity = quantity;
      data.push(result);
    }
    data.sort((a, b) => (a.stock < b.stock) ? 1 : -1);
    return data;
  }

}
