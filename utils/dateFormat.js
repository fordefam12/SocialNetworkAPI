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
        timetamp,
        {monthLength ='short', dateSuffix = true} = {}
    ) => {
        const months ={
            0: monthLength === 'short' ? 'jan' : 'january',
            1: monthLength === 'short' ? 'feb' : 'january',
            2: monthLength === 'short' ? 'mar' : 'january',
            3: monthLength === 'short' ? 'apr' : 'january',
            4: monthLength === 'short' ? 'may' : 'january',
            5: monthLength === 'short' ? 'jun' : 'january',
            6: monthLength === 'short' ? 'jul' : 'january',
            7: monthLength === 'short' ? 'aug' : 'january',
            8: monthLength === 'short' ? 'sep' : 'january',
            9: monthLength === 'short' ? 'oct' : 'january',
            10: monthLength === 'short' ? 'nov' : 'january',
            11: monthLength === 'short' ? 'dec' : 'january',
            

    }
    }
