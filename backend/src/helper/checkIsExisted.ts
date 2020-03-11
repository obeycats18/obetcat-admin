export let checkIsExisted = (set:Array<Object> | any | null, name: any): boolean => {

    if( !set.find( (item:any) => {return item.name === name} )) return false;

    return true
}