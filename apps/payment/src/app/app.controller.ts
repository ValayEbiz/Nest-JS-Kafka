import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern("payment-process")
  handlePaymentProcessing(@Payload() order: any) {
    console.log('Payment processed successfully for payment ' + order.paymentId + " for order " + order)
  }
}
