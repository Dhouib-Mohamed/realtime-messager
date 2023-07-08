<script>
    import axios from 'axios';
    import {goto} from "$app/navigation";

    export let onClose = () => {
    };
    export let onChatSelected = () => {
    };
    export let newChatEmail = '';

    const createConversation = async () => {
        const response = await axios.get(import.meta.env.VITE_BASE_BACKEND_URL + 'user/' + newChatEmail,
            {headers: {'Content-Type': 'application/json'}}
        );
        console.log(response.data)
        // Handle the response, e.g., show success message or perform additional actions
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        onChatSelected({username: response.data.user.username, email: response.data.user.email})
        onClose();
    };
</script>

<div class="modal-container">
    <div class="modal">
        <h3>Start New Conversation</h3>
        <div class="form-control">
            <label>Email</label>
            <input bind:value="{newChatEmail}" required type="email">
        </div>
        <div class="button-container">
            <button class="submit-button" on:click={createConversation}>Start</button>
        </div>
    </div>
</div>

<style>
    .modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-width: max-content;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background-color: #fff;
        padding: 16px;
        border-radius: 4px;
        max-width: 400px;
    }

    .modal h3 {
        margin: 0 0 16px;
    }

    .form-control {
        margin-bottom: 16px;
    }

    .form-control label {
        display: block;
        margin-bottom: 8px;
    }

    .form-control input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .button-container {
        display: flex;
        justify-content: flex-end;
    }

    .submit-button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #4caf50;
        color: #fff;
        cursor: pointer;
    }
</style>
