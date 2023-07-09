<script>
    import axios from 'axios';
    import {goto} from "$app/navigation";

    export let onClose = () => {
    };

    let signInEmail = '';
    let signInPassword = '';
    let error = '';

    const handleSignInSubmit = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_BACKEND_URL + 'auth/signin', {
                email: signInEmail,
                password: signInPassword
            });
            // Save user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Clear input values
            signInEmail = '';
            signInPassword = '';
            await goto('/')


            // Close the modal
            onClose();
        } catch (e) {
            error = e.response.data.error ?? e.message;
        }
    };
</script>

<div class="modal-container">
    <div class="modal">
        <h3>Sign In</h3>
        <div class="form-control">
            <label>Email</label>
            <input bind:value="{signInEmail}" required type="email">
        </div>
        <div class="form-control">
            <label>Password</label>
            <input bind:value="{signInPassword}" required type="password">
        </div>
        <div class="error">
            {error}
        </div>
        <div class="button-container">
            <button class="button" on:click={onClose}>Close</button>
            <button class="submit-button" on:click={handleSignInSubmit}>Sign In</button>
        </div>
    </div>
</div>

<style>

    .error {
        color: red;
        margin-bottom: 16px;
    }

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


    .button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #ccc;
        cursor: pointer;
        margin-right: 8px;
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
