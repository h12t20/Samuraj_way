import {useState} from "react";
import s from './CollapsedMenu.module.css'

export type collapsedMenuType = {
    id: number;
    value: string;
    action: () => void,
} [];
export type collapsedMenuPropsType = {
    menu: collapsedMenuType;
    label: string | JSX.Element | null
}
export const CollapsedMenu = (props: collapsedMenuPropsType) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className={s.menu} onMouseLeave={()=>setCollapsed(false)}>
            <div className={s.label} onClick={props.label ? () => {setCollapsed(!collapsed)} : undefined}>{props.label}</div>
            {collapsed && props.label &&
                props.menu.map(el => <div className={s.item} onClick={el.action}>{el.value}</div>)
            }
        </div>
    )
}