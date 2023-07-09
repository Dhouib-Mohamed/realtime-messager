<script>
    import getDate from '../../utils/getDate.ts';

    export let message;
</script>

<div class="message sender">
    <div class="message-content">{message.body}</div>

    <div class="message-timestamp">{getDate(message.createdAt)}</div>
</div>

<style>
    @import '../../styles/message.css';

    .sender {
        align-items: flex-end;
        background-color: #dcf8c6;
        align-self: flex-end;
    }
</style>
