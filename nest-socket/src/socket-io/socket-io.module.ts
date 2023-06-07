import { Module } from '@nestjs/common';
import { SocketIoService } from './socket-io.service';
import { SocketIoGateway } from './socket-io.gateway';
import { SocketIoController } from './socket-io.controller';

@Module({
    controllers: [SocketIoController],
    providers: [SocketIoService, SocketIoGateway, ]
})
export class SocketIoModule {}
