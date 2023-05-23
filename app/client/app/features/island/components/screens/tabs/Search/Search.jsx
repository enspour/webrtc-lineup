import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Loader from "@components/ui/Loader/Loader";
import SearchEmptyText from "./SearchEmptyText";
import SearchResult from "./SearchResult";

import services from "@services";

import styles from "./Search.module.scss";

const Search = observer(() => {
    const status = services.island.Search.Status;

    useEffect(() => {
        if (services.island.Search.Text) {
            services.island.Search.update();
        }

        return () => services.island.Search.clear();
    }, []);

    if (status === "pending") {
        return (
            <div className={styles.loader}>
                <Loader />
            </div>
        )
    }

    if (status === "idle") {
        return <SearchEmptyText />
    }

    return <SearchResult />
});

export default Search;