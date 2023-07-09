<script>
    import getDate from '../../utils/getDate.ts';

    export let message;
</script>

<div class="message receiver">
    <div class="message-content">{message.body}</div>
    <div class="message-timestamp">{getDate(message.createdAt)}</div>
</div>

<style>
    .message.receiver {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 8px;
        padding: 8px;
        border-radius: 12px;
        background-color: #fff;
        color: #000;
        max-width: 70%;
    }

    .message-content {
        font-size: 14px;
        line-height: 1.4;
        margin-bottom: 4px;
    }

    .message-timestamp {
        font-size: 12px;
        color: #999;
    }
</style>
