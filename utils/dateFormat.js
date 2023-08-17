const addDateSuffix = (date) => {
    let dateStr = date.tostring();

    const lastChar = dateStr.charAt(dateStr.length - 1);

    if(lastChar === '1' && datestr !=='11') {
        dateStr = `${dateStr}st`;
        
    }
}