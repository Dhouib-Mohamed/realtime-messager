<script>
	import axios from 'axios';

	export let onClose = () => {
	};
	export let onChatSelected = () => {
	};
	export let newChatEmail = '';
	let error = '';

	const createConversation = async () => {
		try {
			const response = await axios.get(
					import.meta.env.VITE_BASE_BACKEND_URL + 'user/' + newChatEmail,
					{headers: {'Content-Type': 'application/json'}}
			);
			onChatSelected({username: response.data.user.username, email: response.data.user.email});
			onClose();
		} catch (e) {
			error = e.response?.data?.error ?? e.message ?? "Server Error. Please try again later";
		}
	};
</script>

<div class="modal-container">
	<div class="modal">
		<h3>Start New Conversation</h3>
		<div class="form-control">
			<label for="email">Email</label>
			<input bind:value={newChatEmail} id="email" required type="email"/>
		</div>
		<div class="error">
			{error}
		</div>
		<div class="button-container">
			<button class="button" on:click={onClose}>Close</button>
			<button class="submit-button" on:click={createConversation}>Start</button>
		</div>
	</div>
</div>

<style>
	@import "../../styles/modal.css";
</style>
