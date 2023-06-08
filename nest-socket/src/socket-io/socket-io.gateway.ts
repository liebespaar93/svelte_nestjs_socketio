import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket, Server } from 'socket.io';
import { SocketIoDto } from './dto/socket-io.dto';

@WebSocketGateway({namespace: 'chat', cors: true})
	
export class SocketIoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Namespace;

  afterInit(server: Server) {
    console.count('Init');
	this.server.server.engine.opts.pingTimeout = 500;
	this.server.server.engine.opts.pingInterval = 500;
	this.server.server.engine.opts.upgradeTimeout = 1000;
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
	console.log(payload);
    this.server.emit('message', payload);
  }

  @SubscribeMessage('room-join')
  ft_room_join(client: Socket, payload: string){
	client.join(payload);
  }

  @SubscribeMessage('room-leave')
  ft_room_leave(client: Socket, payload: SocketIoDto){
	// if (!this.server.adapter.rooms.get(payload.message).size)
		// Rooms.indexOf(payload);
	let a = this.server.adapter.rooms;
	// a.values().;
	client.rooms.delete(payload.message);
  }

  @SubscribeMessage('room-list')
  ft_room_list(@ConnectedSocket() client: Socket) {
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
//   @SubscribeMessage('room-reset')
//   ft_room_reset(client: Socket, payload: SocketIoDto)
//   {

// 	console.log(payload);
//   }
  

}
