<script>
	import {onMount} from 'svelte';
	import axios from 'axios';
	import NewConversation from './modals/NewConversation.svelte';
	import {writable} from 'svelte/store';
	import getDate from '../utils/getDate.ts';

	let chats = writable([]);

	export let socket;

	let userData = {};

	const fetchChats = async (page, pageSize) => {
		const sender = userData.email;
		const response = await axios.get(
				import.meta.env.VITE_BASE_BACKEND_URL +
				`user/list/${sender}?page=${page}&pageSize=${pageSize}`,
				{headers: {'Content-Type': 'application/json'}}
		);
		chats.update((value) => [...value, ...response.data]);
	};

	let page = 1;
	const pageSize = 5;
	let isLoading = false;

	const loadMoreChats = async () => {
		if (isLoading) return;

		isLoading = true;
		page++;

		try {
			await fetchChats(page, pageSize);
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	};

	onMount(() => {
		userData = JSON.parse(localStorage.getItem('user'));
		fetchChats(page, pageSize);

		socket.on('newMessage', () => {
			chats.set([]);
			page = 1;
			fetchChats(page, pageSize);
		});
	});

	let showModal = false;
	let newChatEmail = '';

	export let onChatSelected = () => {
		return null;
	};

	const selectChat = (chat) => {
		onChatSelected(chat);
	};

	const openModal = () => {
		showModal = true;
	};

	const closeModal = () => {
		showModal = false;
		newChatEmail = '';
	};

	let containerRef;

	function handleScroll() {
		if (containerRef.scrollTop + containerRef.clientHeight >= containerRef.scrollHeight - 1) {
			loadMoreChats();
		}
	}

	$: {
		if (containerRef) {
			containerRef.addEventListener('scroll', handleScroll);
		}
	}
</script>

<div style="flex: 1;">
	<div bind:this={containerRef} class="chat-list">
		<div class="list">
			{#each $chats as chat (chat.email)}
				<div
						class="list-item"
						on:click={() => {
						selectChat(chat);
					}}
				>
					<div class="avatar-name">
						<div class="avatar"><span>{chat.username.charAt(0).toUpperCase()}</span></div>
						<div class="name">{chat.username}</div>
					</div>
					<div class="chat-details">
						<p>
							{(chat.lastMessage.sender === userData.email ? 'You : ' : '') +
							chat.lastMessage.lastMessage}
						</p>
					</div>
					<div class="time">{getDate(chat.lastMessage.createdAt)}</div>
				</div>
				<div class="breaker"/>
			{/each}
		</div>
	</div>

	<button class="new-chat-btn" on:click={openModal}>New Conversation</button>

	{#if showModal}
		<NewConversation onClose={closeModal} {newChatEmail} {onChatSelected}/>
	{/if}
</div>

<style>
	@import "../styles/chatList.css";
</style>
