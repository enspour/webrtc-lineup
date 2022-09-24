import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import Dropdown from "@components/ui/Dropdown/Dropdown";

import services from "@services";

import styles from "./Header.module.scss";

const AccountMenu = ({ isOpen }) => {
    const router = useRouter();

    const gotoAccount = () => {
        router.push("/account");
    }

    const logout = async () => {
        await services.authAPI.logout();
        router.push("/login");
    }

    const AccountMenuItems = [
        { id: 1, name: "Account", onClick: gotoAccount},
        { id: 2, name: "Logout", onClick: logout}
    ];

    return <Dropdown isOpen={isOpen} items={AccountMenuItems}/>;
}

const Account = observer(() => {
    const user = services.user.User;

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
            <div> {user.name} </div>
            <AccountMenu isOpen={isOpen}/>
        </div>
    )
})

const Header = observer(() => { 
    return (
        <header className={styles.header}>
            <Link href="/">
                <div className={styles.header__logo}>Lineup</div>
            </Link>

            <Account />
        </header>
    )
});

export default Header;