<script lang="ts">
	import { goto } from '$app/navigation';
	import { io_game } from '$lib/webSocketConnection_game';

	let message: string = '';
	let messages: string[] = [];

	function handle_room_list()
	{
		console.log("handle_room_list: ", "game");
		io_game.emit('room-list');
	};
	
	function handleSendMSG ()
	{
		console.log(message);
		io_game.emit('message', { message: message, test: "test" });
	};
  
	function handleNewMessage ( data : testDto )
	{
		messages = [...messages, data.message];
	};

    io_game.on('message', ( data : testDto ) => {
        console.log("join_some : => ", data);
		handleNewMessage(data);
    });

	function chat_goto( event : any )
	{
		console.log(event.target.innerText);
		goto('chat/');
	}

</script>


<button on:click={ handle_room_list } > reset </button>
<div>
	<ul>
		{#if messages }
		{#each messages as msg}
			<li> {msg}</li>
		{/each}
		{/if }
	</ul>
</div>
<div>
	<button on:click={ chat_goto }>goto chat</button>
</div>
<div>
	<input type="text" bind:value={message} />
	<button on:click={ handleSendMSG } > submit</button>
</div>