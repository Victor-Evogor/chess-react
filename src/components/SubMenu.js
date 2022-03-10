import MainSubMenu from "./MainSubMenu";

function SubMenu() {
    let [subMenu,setSubMenu]= window.useState(<MainSubMenu/>);
    window.subMenu=subMenu;
    window.setSubMenu=setSubMenu;
    return <div>{subMenu}</div>
}

export default SubMenu;