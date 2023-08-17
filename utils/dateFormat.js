const addDateSuffix = (date) => {
    let dateStr = date.tostring();

    const lastChar = dateStr.charAt(dateStr.length - 1);

    if(lastChar === '1' && datestr !=='11') {
        dateStr = `${dateStr}st`;
    }else if (lastChar === '2' && dateStr !== '12'){
        dateStr = `${dateStr}nd`;
    }else if (lastChar === '3' && dateStr !== '13'){
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }
    return dateStr;
    };

    module.exports = (
        timestamp,
        {monthLength ='short', dateSuffix = true} = {}
    ) => {
        const months ={
            0: monthLength === 'short' ? 'jan' : 'january',
            1: monthLength === 'short' ? 'feb' : 'february',
            2: monthLength === 'short' ? 'mar' : 'march',
            3: monthLength === 'short' ? 'apr' : 'april',
            4: monthLength === 'short' ? 'may' : 'may',
            5: monthLength === 'short' ? 'jun' : 'june',
            6: monthLength === 'short' ? 'jul' : 'july',
            7: monthLength === 'short' ? 'aug' : 'august',
            8: monthLength === 'short' ? 'sep' : 'september',
            9: monthLength === 'short' ? 'oct' : 'october',
            10: monthLength === 'short' ? 'nov' : 'november',
            11: monthLength === 'short' ? 'dec' : 'december',
    };
    const dateObj = new date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getHours();

    if (hour === 0){
        hour = 12;
    }
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
    
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
    };
