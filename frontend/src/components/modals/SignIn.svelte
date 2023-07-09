<script>
    import axios from 'axios';
    import {goto} from '$app/navigation';

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
            await goto('/');

            // Close the modal
            onClose();
        } catch (e) {
            error = e.response?.data?.error ?? e.message ?? "Server Error. Please try again later";
        }
    };
</script>

<div class="modal-container">
    <div class="modal">
        <h3>Sign In</h3>
        <div class="form-control">
            <label for="email">Email</label>
            <input bind:value={signInEmail} id="email" required type="email"/>
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input bind:value={signInPassword} id="password" required type="password"/>
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
    @import "../../styles/modal.css";
</style>
