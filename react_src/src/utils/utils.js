


// export const formatDate = (date) => {
//     const currentDate = new Date();
//     const targetDate = new Date(date);
//
//     if (currentDate.toDateString() === targetDate.toDateString()) {
//         return targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
//     } else {
//         return targetDate.toLocaleDateString("fr-CH");
//     }
// };

export const formatDate = (inputDate) => {
    const currentDate = new Date();
    const date = new Date(inputDate);

    if (isSameDay(currentDate, date)) {
        return formatTime(date);
    } else if (isSameMonth(currentDate, date)) {
        return formatDateAndMonth(date);
    } else {
        return formatDateMonthYear(date);
    }
}

function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function isSameMonth(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
    );
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function formatDateAndMonth(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
}

function formatDateMonthYear(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}, ${day}`;
}

export const getHour = (inputDate) => {
    const date = new Date(inputDate);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return hour + ':' + minutes;
}