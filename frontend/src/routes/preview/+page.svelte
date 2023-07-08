<script>
    import SignIn from '../../components/modals/SignIn.svelte';
    import SignUp from '../../components/modals/SignUp.svelte';
    import {onMount} from "svelte";
    import {goto} from '$app/navigation';

    let showSignInModal = false;
    let showSignUpModal = false;

    const handleSignIn = () => {
        showSignInModal = true;
    };

    const handleSignUp = () => {
        showSignUpModal = true;
    };

    onMount(() => {
        const userData = localStorage.getItem('user');

        if (userData !== null) {
            goto('/');
        }
    });
</script>

<style>
    .login-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
    }

    .login-card {
        width: 300px;
        padding: 24px;
        text-align: center;
        background-color: #ffffff;
        color: #333333;
        border-radius: 8px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
        font-size: 24px;
        margin-bottom: 24px;
    }

    p {
        font-size: 16px;
        margin-bottom: 24px;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
    }

    .custom-button {
        padding: 12px 24px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .custom-button.primary {
        background-color: #2196f3;
        color: #ffffff;
    }

    .custom-button.secondary {
        background-color: #f44336;
        color: #ffffff;
    }

    .custom-button:hover {
        background-color: #e0e0e0;
        color: #333333;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    }

    .modal-content {
        width: 400px;
        background-color: #ffffff;
        color: #333333;
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    }
</style>

<div class="login-page">
    <div class="login-card">
        <h2>Login</h2>
        <p>Welcome to our login page. Please sign in or sign up to access your account.</p>
        <div class="button-container">
            <button class="custom-button primary" on:click={handleSignIn}>Sign In</button>
            <button class="custom-button secondary" on:click={handleSignUp}>Sign Up</button>
        </div>
    </div>

    {#if showSignInModal}
        <div class="modal-overlay">
            <div class="modal-content">
                <SignIn onClose={() => showSignInModal = false}/>
            </div>
        </div>
    {/if}

    {#if showSignUpModal}
        <div class="modal-overlay">
            <div class="modal-content">
                <SignUp onClose={() => showSignUpModal = false}/>
            </div>
        </div>
    {/if}
</div>
