import { memo } from 'react'

const Loader = () => {
    return (
        <div className="h-100 w-100 fl al-center jf-center">
            <div className="loader"></div>
        </div>
    )
}

export default memo(Loader)