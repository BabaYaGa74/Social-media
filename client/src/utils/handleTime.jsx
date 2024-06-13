export function handleTime(createdAt) {
  const createdTime = new Date(createdAt);
  const now = new Date();
  const diffInMilliseconds = now - createdTime;

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;

  if (diffInMilliseconds < minutesInMs) {
    return Math.floor(diffInMilliseconds / secondsInMs) + " seconds ago";
  } else if (diffInMilliseconds < hoursInMs) {
    return Math.floor(diffInMilliseconds / minutesInMs) + " min ago";
  } else if (diffInMilliseconds < daysInMs) {
    const time = Math.floor(diffInMilliseconds / hoursInMs);
    return time > 1 ? time + " hours ago" : time + " hour ago";
  } else {
    const time = Math.floor(diffInMilliseconds / daysInMs);
    return time > 1 ? time + " days ago" : time + " day ago";
  }
}



export function handleDateTime(createdAt) {
    const createdTime = new Date(createdAt);
    const now = new Date();
    const diffInMilliseconds = now - createdTime;

    const secondsInMs = 1000;
    const minutesInMs = secondsInMs * 60;
    const hoursInMs = minutesInMs * 60;
    const daysInMs = hoursInMs * 24;
    const weeksInMs = daysInMs * 7;

    if (diffInMilliseconds < daysInMs) {
        return handleTime(createdAt);
    } else if (diffInMilliseconds < weeksInMs) {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const day = days[createdTime.getDay()];
        let hours = createdTime.getHours();
        const minutes = createdTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${day} AT ${hours}:${formattedMinutes} ${ampm}`;
    } else {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const day = createdTime.getDate();
        const month = createdTime.getMonth();
        const year = createdTime.getFullYear();
        const hours = createdTime.getHours();
        const minutes = createdTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedMonth = months[month];
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${day} ${formattedMonth} AT ${hours}:${formattedMinutes} ${ampm}`;
    }
}
