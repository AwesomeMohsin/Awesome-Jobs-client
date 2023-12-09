export function dateTimestampFormat(timestamp) {
    const date = new Date(timestamp);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const parts = formattedDate.split(" ");
    const month = parts[0];
    const day = parts[1].slice(0, -1);
    const year = parts[2];
  
    return `${day} ${month}, ${year}`;
  }