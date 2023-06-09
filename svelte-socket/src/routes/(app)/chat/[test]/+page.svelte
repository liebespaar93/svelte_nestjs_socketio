
<script lang="ts">
	import { goto } from "$app/navigation";
	import { io_chat } from "$lib/webSocketConnection_chat";

	let message: string = '';
	let messages: string[] = [];

	let room_list: string[] = [];
	let room_name: string;

	function handleSendMSG ()
	{
		console.log(message);
		io_chat.emit('message', { message: message, test: "test" });
	};
  
	function handleNewMessage ( data : testDto )
	{
		messages = [...messages, data.message];
	};
	io_chat.on('room-list', ( data : string ) => {
		console.log(io_chat.id);
		console.log(data);
	}); 

    io_chat.on('message', ( data : testDto ) => {
        console.log("join_some : => ", data);
		handleNewMessage(data);
    })
    
	function game_goto( event : any )
	{
		console.log(event.target.innerText);
		goto('/game/');
	}
</script>

<div>
	<div></div>
	<ul>
		{#if messages }
		{#each messages as msg}
			<li> {msg} </li>
		{/each}
		{/if }
	</ul>
</div>
<div>
	<button on:click={ game_goto }>goto game</button>
</div>
<div>
	<input type="text" bind:value={message} />
	<button on:click={ handleSendMSG } > submit</button>
</div>