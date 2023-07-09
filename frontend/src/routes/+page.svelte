<script>
    import ChatList from '../components/ChatList.svelte';
    import ChatWindow from '../components/ChatWindow.svelte';
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import io from 'socket.io-client';

    let selectedChat = null;
    const selectedChatHandler = (chat) => {
        selectedChat = chat;
    };
    let socket = null;

    onMount(() => {
        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData === null) {
            goto('/preview');
        }

        socket = io(import.meta.env.VITE_BASE_SOCKET_PORT, {
            path: '/socket.io'
        });

        socket.on('connect', () => {
            console.log('Socket.io connected');
            socket.emit('join', userData.email);
        });
        socket.on('newMessage', (message) => {
            if (message.notif) {
                const audio = new Audio('/notification.wav');
                audio.play();
            }
        });
        return () => {
            socket.disconnect();
        };
    });
</script>

{#if socket}
    <div class="app">
        <div class="header">
            <h1>Chat App</h1>
            <button
                    class="signout"
                    on:click={() => {
					localStorage.removeItem('user');
					goto('/preview');
				}}
            >Sign Out
            </button>
        </div>

        <div class="content">
            <ChatList onChatSelected={selectedChatHandler} {socket}/>
            <div class="chat-window">
                {#if selectedChat}
                    <ChatWindow chat={selectedChat} {socket}/>
                {:else}
                    <h2>Select a chat to start messaging</h2>
                {/if}
            </div>
        </div>
    </div>
{:else}
    <h1>Connecting...</h1>
{/if}

<style>
    @import '../styles/main.css';
</style>
