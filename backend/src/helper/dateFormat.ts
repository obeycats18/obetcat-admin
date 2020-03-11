export let dateFormat = (date: Date):string => {

    let month = date.getMonth() + 1;
    let day = date.getDate();

    let dateToString = `${date.getFullYear()}-${(month > 9 ? '' : '0') + month}-${(day > 9 ? '' : '0') + day}`

    return dateToString;

}