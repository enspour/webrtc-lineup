import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import Dropdown from "@components/ui/Dropdown/Dropdown";

import useLogout from "@hooks/useLogout";

import services from "@services";

import styles from "./Header.module.scss";

const AccountMenu = ({ isOpen }) => {
    const router = useRouter();
    const logout = useLogout();

    const gotoAccount = () => router.push("/account");

    const AccountMenuItems = [
        { id: 1, name: "Account", onClick: gotoAccount},
        { id: 2, name: "Logout", onClick: logout}
    ];

    return <Dropdown isOpen={isOpen} items={AccountMenuItems}/>;
}

const Account = observer(() => {
    const name = services.user.Name;

    const accountRef = React.useRef();
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            accountRef.current.classList.add(styles.account__active);
        } else {
            accountRef.current.classList.remove(styles.account__active);
        }
    }, [isOpen]);

    return (
        <div className={styles.account} ref={accountRef} onClick={() => setIsOpen((prev) => !prev)}>
            <div className={styles.account__avatar}></div>
            <div className="c-p"> {name} </div>
            <AccountMenu isOpen={isOpen}/>
        </div>
    )
})

const Header = () => { 
    return (
        <header className={styles.header}>
            <Link href="/">
                <div className={styles.header__logo}>Lineup</div>
            </Link>

            <Account />
        </header>
    )
};

export default React.memo(Header);