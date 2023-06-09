
<script lang="ts">
	import { goto } from "$app/navigation";
	import { io_chat } from "$lib/webSocketConnection_chat";

	let room_list: string[] = ["defualt"];
	let room_name: string;

	function handle_make_room()
	{
		console.log("make room : ", room_name);
		io_chat.emit('room-join',  room_name);
	}

	function handle_room_list()
	{
		console.log("handle_room_list: ", room_name);
		io_chat.emit('room-list');
	}

	io_chat.on('room-list', ( data : string []) => {
		console.log(io_chat.id);
		console.log(data);
		room_list = [...data];
	});

	io_chat.on('room-reset', ( data : string []) => {
		console.log('room-reset: ', data);
	});
    
	function test_goto( event : any )
	{
		console.log(event.target.innerText);
		goto('/chat/'+ event.target.innerText);
	}
</script>

<div>
	<button on:click={ handle_room_list } > reset </button>
	<ul>
		{#if room_list}
		{#each room_list as rm}
			<li id="room" on:click={test_goto}  > {rm} </li>
		{/each}
		{/if}
			<li> test</li>
	</ul>
	<input type="text" bind:value={room_name} />
	<button on:click={ handle_make_room } > room create </button>
</div>

<style>
	#room {
		display: block;
		color: #999;
		border-bottom: #999;
		border: #900 solid;
		background-color: #900;
		width: 50%;
	}
</style>