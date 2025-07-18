function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let reminingSecond = time % 3600;
    const minute = parseInt(reminingSecond / 60);
    reminingSecond = reminingSecond % 60;

    return `${hour} Hour ${minute} minute ${reminingSecond} second ago`
}

console.log(getTimeString(7865))