export const required=(value:string)=>!value? 'Field is required!': undefined
export const maxLengthCreator=(maxLength:number)=>(value:string)=> {if (value && value.length>maxLength)
    return `Field length must be under ${maxLength} chars!`;
    return undefined}
export const minLengthCreator=(minLength:number)=>(value:string)=> {if (value && value.length<minLength)
    return `Field length must be more than ${minLength} chars!`;
    return undefined}
export const emailValid=(value:string)=>{
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return 'Incorrect email!';
    return undefined
}