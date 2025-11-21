import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("KAFKA_SERVICE") private readonly kafkaServiceClinet: ClientKafka
  ) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern("order-created")
  handleOrderCreate(@Payload() order: any) {
    const paymentId = Math.random() * 10;
    console.log("Order Recived and payment(" + paymentId + ") processing initiated!", order);
    order.paymentId = paymentId;
    this.kafkaServiceClinet.emit('payment-process', order);
  }
}
