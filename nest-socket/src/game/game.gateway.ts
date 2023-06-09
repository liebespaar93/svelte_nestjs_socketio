import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket, Namespace } from 'socket.io';
import { SocketIoDto } from './dto/socket-io.dto';


@WebSocketGateway({namespace: 'game'})
// implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

  @WebSocketServer() server: Namespace;

  afterInit(server: Server) {
    console.count('Init');
	this.server.server.engine.opts.pingTimeout = 20000;
	this.server.server.engine.opts.pingInterval = 20000;
	this.server.server.engine.opts.upgradeTimeout = 20000;
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect');
	console.log(client.id);
  }

  handleConnection(client: Socket) {
    console.log('connect');
	console.log(client.id);
	client.join("defult");
	client.leave(client.id);
	console.log(client.rooms);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: SocketIoDto){
    this.server.emit('message', payload);
  }

  @SubscribeMessage('room-list')
  ft_room_list(client: Socket) {
	let roomlist : string [] = [];

	console.log()
	this.server.adapter.rooms.forEach((val, key, map) => {
		console.log(key, " ", val);
		roomlist.join(key);
	});
	// console.log("server =>> sw : " , this.server);
	console.log("\n");
	// client.emit("room-list", roomlist );
  }

}
