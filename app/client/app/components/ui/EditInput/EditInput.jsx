import React from "react";
import PropTypes from "prop-types";

import Svg from "../Svg/Svg";

import EditIcom from "@assets/images/general/edit.svg";

import styles from "./EditInput.module.scss";

const EditInput = ({ value, setValue, placeholder, onClick }) => {
    return (
        <div className={styles.wrapper}>
            <input 
                className={styles.input} 
                type="text" 
                placeholder={placeholder}
                value={value} 
                onChange={e => setValue(e.target.value)} 
            />
            
            <Svg url={EditIcom} width="1.8" height="1.8" onClick={onClick}/>
        </div>
    )
}

EditInput.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default React.memo(EditInput);