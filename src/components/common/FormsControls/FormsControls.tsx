import s from './FormsControls.module.css'
export const Textarea = ({input,meta,...restProps}:any) =>{
    return(<FormControl children={<textarea {...input} {...restProps} />} meta={meta}/>)}

export const Input = ({input,meta,...restProps}:any) =>{
    return(<FormControl children={<input {...input} {...restProps}/>} meta={meta}/>)}
export const FormControl = ({meta, children}:any) =>{
    const hasError=meta.touched && meta.error
    return (
        <div className={s.formControl + " " + (hasError? s.error: '')}>
            <div>{children}</div>
            <div>{hasError && <span className='s.error'>{meta.error}</span>}</div>
        </div>
    )}