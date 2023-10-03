import React from "react";
import s from './Login.module.css'
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {emailValid, maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../Redux/auth_reducer";
import {StateType} from "../../Redux/redux_store";
import {Redirect} from "react-router-dom";

export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
}
export const maxLength50 = maxLengthCreator(50)
export const maxLength200 = maxLengthCreator(200)
export const minLength4 = minLengthCreator(4)

export const LoginForm = (props: InjectedFormProps<LoginFormType>) => {
    console.log(props)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field autoComplete={'on'} placeholder={'E-mail'} name={'email'} component={Input}
                       validate={[required, maxLength50, emailValid]} className={s.field}/>
            </div>
            <div>
                <Field autoComplete={'on'} placeholder={'Password'} type='password' name={'password'} component={Input}
                       validate={[minLength4, maxLength50]} className={s.field}/>
            </div>
            <div className={s.rememberMe}>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} />
                <div>remember me</div>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormType>({form: 'login'})(LoginForm)
const Login = (props: {
    login: (formData: LoginFormType) => void,
    isAuth?: string | null
}) => {
    const onSubmit = (formData: LoginFormType) => {
        props.login(formData)
    }
    if (props.isAuth) return <Redirect to={'/profile'}/>
    return (
        <div className={s.container}>
            <div className={s.login}><h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}
const mstP = (state: StateType) => ({isAuth: state.auth.login})
export default connect(mstP, {login})(Login)

