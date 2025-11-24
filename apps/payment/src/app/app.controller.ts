import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("KAFKA_SERVICE") private readonly kafkaServiceClient: ClientKafka
  ) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern("payment-process")
  handlePaymentProcessing(@Payload() order: any) {
    console.log('Payment processed successfully for payment ' + order.paymentId + " for order " + order)
    this.kafkaServiceClient.emit('payment-succeed', order)
  }
}
