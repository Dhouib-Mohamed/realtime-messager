<script>
    import SignIn from '../../components/modals/SignIn.svelte';
    import SignUp from '../../components/modals/SignUp.svelte';
    import {onMount} from 'svelte';
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
                <SignIn onClose={() => (showSignInModal = false)}/>
            </div>
        </div>
    {/if}

    {#if showSignUpModal}
        <div class="modal-overlay">
            <div class="modal-content">
                <SignUp onClose={() => (showSignUpModal = false)}/>
            </div>
        </div>
    {/if}
</div>

<style>
   @import "../../styles/login.css";
</style>
