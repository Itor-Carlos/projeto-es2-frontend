export const formatTime = (time) => {
    if (!time) return;
    const [hour, minute] = time.split(':');
    return `${hour}:${minute}`;
}