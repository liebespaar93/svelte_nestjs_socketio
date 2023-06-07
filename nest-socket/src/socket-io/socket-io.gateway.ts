import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { SocketIoDto } from './dto/socket-io.dto';
import { Socket } from 'dgram';

@WebSocketGateway({namespace: 'chat', cors: true})
// implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
export class SocketIoGateway {

  @WebSocketServer() server: Namespace;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: SocketIoDto){
	console.log(payload);
    this.server.emit('message', payload);
  }
}
