class socketIODto{
	message;
	test;
	genres;
  
	constructor(data)
	{
	  this.message = data.message;
	  this.test = data.test;
	  this.genres = data.genres;
	}
  }
  
  const socket_game = io("http://localhost:3000/game");
  const socket_chat = io("http://localhost:3000/chat");
		  
  const message = document.getElementById('message');
  const messages = document.getElementById('messages');
  
  const handleSendMSG = () => {
	socket_chat.emit('message', { message: message.value, test: "test" });
  };
  
  socket_chat.on('message', ( data ) => {
	console.log(data);
	handleNewMessage(data);
  });
  
  socket_game.on('message', ( data ) => {
	  console.log(data);
	  handleNewMessage(data);
  });
  const handleNewMessage = ( data ) => {
	messages.appendChild(buildNewMessage(data.message));
  };
  
  const buildNewMessage = ( message ) => {
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(message));
	return li;
  }