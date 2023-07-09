<script>
    import getDate from '../../utils/getDate.ts';

    export let message;
</script>

<div class="message receiver">
    <div class="message-content">{message.body}</div>
    <div class="message-timestamp">{getDate(message.createdAt)}</div>
</div>

<style>
    @import "../../styles/message.css";

    .receiver {
        align-items: flex-start;
        background-color: #fff;
    }
</style>
