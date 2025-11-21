import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private kakfaServiceProducer: ClientKafka
  ) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('order')
  createOrder(@Body() order: {}) {
    this.kakfaServiceProducer.emit('order-created', order)
    return ({ message: 'Order Created and Sent further in kafka to process', order })
  }
}
