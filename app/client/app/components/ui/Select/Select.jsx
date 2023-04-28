import React from "react";
import PropTypes from "prop-types";

import useOutsideAlerter from "@hooks/useOutsideAlerter";

import Svg from "../Svg/Svg";

import ArrowUpIcon from "@assets/images/select/arrowup.svg";
import ArrowDownIcon from "@assets/images/select/arrowdown.svg";

import styles from "./Select.module.scss";

const Options = ({ isOpen, options, setValue }) => {
    if (!isOpen) return "";

    return (
        <div className={styles.options}>
            {
                options.map(item => 
                    <div 
                        key={item.id}
                        className={styles.option}
                        onClick={() => setValue(item)}
                    >
                        {item.label}
                    </div>
                )
            }
        </div> 
    )
}

const Select = ({ options, value, setValue }) => {
    const [ref, isOpen, setIsOpen] = useOutsideAlerter(false);

    return (
        <div className={styles.wrapper}>
            <div ref={ref} className={styles.select} onClick={() => setIsOpen(prev => !prev)}>
                <span> { value.label } </span>
                {
                    isOpen 
                        ? <Svg url={ArrowUpIcon} width="1.2" height="0.8"/>
                        : <Svg url={ArrowDownIcon} width="1.2" height="0.8"/>
                }
            </div>

            <Options isOpen={isOpen} options={options} setValue={setValue}/>
        </div>
    )
}

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,

    value: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    setValue: PropTypes.func.isRequired,
}

export default React.memo(Select);