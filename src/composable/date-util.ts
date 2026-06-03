// hours must be in 12h format.
export function dateFormat(date: Date, format: string): string {
    let pm_or_am: string = ' PM';
    let h = date.getHours();
    if (h === 0) {
        h = 12; // 12 AM
        pm_or_am = ' AM';
    } else if (h > 12) 
        h -= 12;
    
    const map: { [key: string]: string } = {
        'YYYY': date.getFullYear().toString(),
        'MM': (date.getMonth() + 1).toString().padStart(2, '0'),
        'DD': date.getDate().toString().padStart(2, '0'),
        'hh': h.toString().padStart(2, '0'),
        // 'hh': date.getHours().toString().padStart(2, '0'),
        'mm': date.getMinutes().toString().padStart(2, '0'),
        'ss': date.getSeconds().toString().padStart(2, '0'),
    };

    return format.replace(/YYYY|MM|DD|hh|mm|ss|aa/g, matched => map[matched]).concat(pm_or_am);
}