<script>
    import SenderMessage from "./messages/SenderMessage.svelte";
    import ReceiverMessage from "./messages/ReceiverMessage.svelte";
    import {onMount, afterUpdate} from "svelte";
    import axios from "axios";
    import {writable} from "svelte/store";

    export let chat = null;
    export let socket = null;

    let containerRef;
    let previousChat = null;
    let messageInput = '';
    let messages = writable([]);
    let sender;
    let page = 1;
    const page_size = 10;
    let isLoading = false;

    function scrollToBottom() {
        containerRef.scrollTop = containerRef.scrollHeight;
    }

    const sendMessage = async () => {
        if (messageInput.trim() !== '') {
            const receiver = chat.email;
            const body = messageInput.trim();
            try {
                const response = await axios.post(import.meta.env.VITE_BASE_BACKEND_URL + 'messager', {
                    sender: sender.email,
                    receiver,
                    body
                });
                messageInput = '';
            } catch (error) {
                console.error(error);
            }
        }
    };

    const getMessages = async (scroll = true) => {
        if (isLoading) return;

        isLoading = true;

        try {
            const receiver = chat.email;
            const response = await axios.get(import.meta.env.VITE_BASE_BACKEND_URL + `messager/${sender.email}/${receiver}?page=${page}&pageSize=${page_size}`);
            const reversedMessages = response.data.reverse(); // Reverse the order of messages
            messages.update((existingMessages) => [...reversedMessages, ...existingMessages]);
            if (scroll) scrollToBottom();
            page++;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading = false;
        }
    };

    onMount(async () => {
        previousChat = chat;
        sender = JSON.parse(localStorage.getItem('user'));
        if (chat) {
            await getMessages(false);
            scrollToBottom();
        }
        socket.on('newMessage', (message) => {
            messages.update((existingMessages) => [message.message, ...existingMessages]); // Add new message to the beginning of the array
            scrollToBottom();
        });
    });

    afterUpdate(() => {
        if (chat !== previousChat) {
            messages.set([]);
            page = 1;
            getMessages(false);
            previousChat = chat;
            scrollToBottom();
        }
    });

    function handleScroll() {
        if (containerRef.scrollTop === 0) {
            getMessages(false);
        }
    }

    $: {
        if (containerRef) {
            containerRef.addEventListener('scroll', handleScroll);
        }
    }
</script>

<div style="height: 100%">
    <h2>{chat.username}</h2>
    <div bind:this={containerRef} class="messages">
        {#each $messages as message (message.body + message.createdAt)}
            {#if message.sender === sender.email}
                <SenderMessage {message}/>
            {:else}
                <ReceiverMessage {message}/>
            {/if}
        {/each}
    </div>
    <div class="message-input">
        <input bind:value={messageInput} placeholder="Type a message" type="text">
        <button on:click={sendMessage}>Send</button>
    </div>
</div>

<style>
    .messages {
        height: calc(100% - 150px);
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    .message-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
    }

    .message-input input {
        flex: 1;
        padding: 8px;
        border-radius: 4px;
        border: none;
    }

    .message-input button {
        margin-left: 8px;
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        background-color: #4caf50;
        color: #fff;
        cursor: pointer;
    }
</style>
