
<script lang="ts">
	import ioClient from 'socket.io-client';
	

	const ENDPOINT = 'http://localhost:3000/chat';

	const socket = ioClient(ENDPOINT);

	let message: string = '';
	let messages: string[] = [];

	export const io = socket;

	
	function handleSendMSG ()
	{
		console.log(message);
		io.emit('message', { message: message, test: "test" });
	};
  
	function handleNewMessage ( data : testDto )
	{
		messages = [...messages, data.message];
	};

    socket.on('message', ( data : testDto ) => {
        console.log("join_some : => ", data);
		handleNewMessage(data);
    })
    
</script>


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
	<input type="text" bind:value={message} />
	<button on:click={ handleSendMSG } > submit</button>
</div>