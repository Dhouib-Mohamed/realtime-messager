<script>
    import {onMount} from "svelte";
    import axios from "axios";
    import NewConversation from "./modals/NewConversation.svelte";
    import {writable} from "svelte/store";
    import getDate from "../utils/getDate.ts";

    let chats = writable([]);

    export let socket;

    let userData = {};

    const fetchChats = async (page, pageSize) => {
        const sender = userData.email;
        const response = await axios.get(import.meta.env.VITE_BASE_BACKEND_URL + `user/list/${sender}?page=${page}&pageSize=${pageSize}`, {headers: {'Content-Type': 'application/json'}});
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

        socket.on('newMessage', (message) => {
            fetchChats(page, pageSize);
        });
    });

    let showModal = false;
    let newChatEmail = '';

    export let onChatSelected = () => {
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
        if (containerRef.scrollTop + containerRef.clientHeight >= containerRef.scrollHeight) {
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
        <ul class="list">
            {#each $chats as chat (chat.email)}
                <li class="list-item" on:click={() => {selectChat(chat)}}>
                    <div class="avatar-name">
                        <div class="avatar"><span>{chat.username.charAt(0).toUpperCase()}</span></div>
                        <div class="name">{chat.username}</div>
                    </div>
                    <div class="chat-details">
                        <p>{(chat.lastMessage.sender === userData.email ? "You : " : "") + chat.lastMessage.lastMessage}</p>
                    </div>
                    <div class="time">{getDate(chat.lastMessage.createdAt)}</div>
                </li>
            {/each}
        </ul>
    </div>

    <button class="new-chat-btn" on:click={openModal}>New Conversation</button>

    {#if showModal}
        <NewConversation onClose={closeModal} newChatEmail={newChatEmail} onChatSelected={onChatSelected}/>
    {/if}
</div>

<style>
    .chat-list {
        height: calc(100% - 80px);
        overflow-y: auto;
        background-color: #fff;
        padding: 16px;
    }

    .list-item {
        margin-bottom: 30px;
        elevation: higher;
    }

    .avatar-name {
        display: flex;
        align-items: center;
    }

    .avatar-name .name {
        margin-left: 8px;
        font-size: 16px;
        font-weight: bold;
    }

    .avatar-name .avatar {
        width: 30px;
        height: 30px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 50%;
        background-color: #4caf50;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .chat-details {
        margin-top: 4px;
        max-width: 200px;
    }

    .time {
        color: #999;
    }

    .new-chat-btn {
        margin-top: 16px;
    }
</style>
