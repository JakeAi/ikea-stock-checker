import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import checker from 'ikea-availability-checker';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('todos')
  async getData(
    @Body('data') body: string,
    @Body('store') store: any
  ) {
    try {
      const lastThree = body.split('').slice(body.length - 3, body.length).join('');
      const extraData = await axios.get(`https://www.ikea.com/us/en/products/${lastThree}/${body}.json`);
      const result = await checker.availability(store.buCode, body);
      result.extraData = extraData.data;
      return result;
    } catch (e) {
      console.log('failed', body);
    }
  }

}
