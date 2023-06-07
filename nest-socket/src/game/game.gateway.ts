import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketIoDto } from './dto/socket-io.dto';
import { Socket } from 'dgram';
import { Namespace } from 'socket.io';

@WebSocketGateway({namespace: 'game'})
// implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
export class GameGateway {

  @WebSocketServer() server: Namespace;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: SocketIoDto){
    this.server.emit('message', payload);
  }
}
