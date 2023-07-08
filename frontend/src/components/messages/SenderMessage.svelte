<script>
    import getDate from "../../utils/getDate.ts";

    export let message;
</script>

<div class="message sender">
    <div class="message-content">{message.body}</div>
    <div class="message-timestamp">{getDate(message.createdAt)}</div>
</div>

<style>
    .message.sender {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-bottom: 8px;
        padding: 8px;
        border-radius: 12px;
        background-color: #DCF8C6;
        color: #000;
        min-width: 70%;
        align-self: flex-end;
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
