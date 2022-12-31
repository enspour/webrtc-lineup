export const convertFromDaysToMilliseconds = (days: number) => {
    return 24 * 60 * 60 * 1000 * days;
}

export const convertFromMinuteToMilliseconds = (minutes: number) => {
    return 60 * 1000 * minutes;
}

export const convertTimeToMs = (time: string) => {
    if (time.endsWith("m")) {
        const minutes = parseFloat(time.replace("m", ""));
        return convertFromMinuteToMilliseconds(minutes);        
    }

    if (time.endsWith("d")) {
        const days = parseFloat(time.replace("d", ""));
        return convertFromDaysToMilliseconds(days);
    }
}