import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern('payment-succeed')
  handlePaymentSucceed(@Payload() order: any) {
    console.log('Notification Sent for successful payment ' + order.paymentId);
  }
}
