import React from "react";
import PropTypes from "prop-types";

const Svg = ({ url, height, width, color, onClick }) => (
    <span
        onClick={e => onClick?.call({}, e)} 
        style={{ 
            padding: "0.3rem",
            height: "fit-content"
        }}
    >
        <div 
            style={{ 
                WebkitMaskSize: "cover",
                maskSize: "cover",
                WebkitMaskImage: `url(${url})`,
                maskImage: `url(${url})`,
                backgroundColor: color || `var(--theme-color-icon)`, 
                width: `${width}rem`,
                height: `${height}rem`,
                cursor: onClick ? "pointer" : "auto"
            }}
        />
    </span>
)

Svg.propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick: PropTypes.func,
    color: PropTypes.string
}

export default React.memo(Svg);