
<script lang="ts">
	import { goto } from "$app/navigation";
	import { io_main } from "$lib/webSocketConnection_main";

	let message: string = '';
	let messages: string[] = [];

	let room_list: string[] = [];
	let room_name: string;

	function handle_make_room()
	{
		console.log("make room : ", room_name);
		io_main.emit('room-join',  room_name);
	}

	function handle_room_list()
	{
		console.log("handle_room_list: ", room_name);
		io_main.emit('room-list');
	}

	io_main.on('room-list', ( data : string ) => {
		console.log(io_main.id);
		console.log(data);
	});

	io_main.on('room-reset', ( data : string ) => {
		console.log('room-reset: ', data);
	});
    
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
