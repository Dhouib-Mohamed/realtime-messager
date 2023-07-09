<script>
    import axios from 'axios';
    import {goto} from '$app/navigation';

    export let onClose = () => {
    };

    let signUpUsername = '';
    let signUpEmail = '';
    let signUpPassword = '';
    let error = '';

    const handleSignUpSubmit = async () => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BASE_BACKEND_URL + 'auth/signup',
                {
                    email: signUpEmail,
                    password: signUpPassword,
                    username: signUpUsername
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Save user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Clear input values
            signUpUsername = '';
            signUpEmail = '';
            signUpPassword = '';
            await goto('/');

            // Close the modal
            onClose();
        } catch (e) {
            console.log(e.response.data.error ?? e.message);
            error = e.response?.data?.error ?? e.message ?? "Server Error. Please try again later";
        }
    };
</script>

<div class="modal-container">
    <div class="modal">
        <h3>Sign Up</h3>
        <div class="form-control">
            <label for="username">Username</label>
            <input bind:value={signUpUsername} id="username" required type="text"/>
        </div>
        <div class="form-control">
            <label for="email">Email</label>
            <input bind:value={signUpEmail} id="email" required type="email"/>
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input bind:value={signUpPassword} id="password" required type="password"/>
        </div>
        <div class="error">
            {error}
        </div>
        <div class="button-container">
            <button class="button" on:click={onClose}>Close</button>
            <button class="submit-button" on:click={handleSignUpSubmit}>Sign Up</button>
        </div>
    </div>
</div>

<style>
    @import "../../styles/modal.css";
</style>
