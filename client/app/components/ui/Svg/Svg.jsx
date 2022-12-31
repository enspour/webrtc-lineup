import React from "react";
import PropTypes from "prop-types";

const Svg = ({ url, height, width, color, onClick }) => {
    const handleClick = (e) => {
        onClick?.call({}, e)
    }

    const iconStyle = {
        WebkitMaskSize: "cover",
        maskSize: "cover",
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        backgroundColor: color || `var(--theme-icon-primary)`,
        width: `${width}rem`,
        height: `${height}rem`,
        cursor: onClick ? "pointer" : "auto",
    }

    const wrapperStyle = {
        padding: "0.3rem",
        height: "fit-content"
    }

    return (
        <span
            onClick={handleClick} 
            style={wrapperStyle}
        >
            <div style={iconStyle}/>
        </span>
    )
}

Svg.propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick: PropTypes.func,
    color: PropTypes.string
}

export default React.memo(Svg);