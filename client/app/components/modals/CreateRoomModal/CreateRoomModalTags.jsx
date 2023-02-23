import { useState, memo } from 'react'

import InputControl from '@components/ui/InputControl/InputControl';
import Svg from "@components/ui/Svg/Svg";

import AddIcon from "@assets/images/create-room-modal/add.svg";

import styles from "./CreateRoomModal.module.scss";

const AddedTags = ({ tags, setTags }) => {
    const removeTag = (name) => {
        setTags((prev) => new Set([...prev].filter(item => item !== name)))
    }; 

    return (
        <div className={styles.modal__fields__tags}>
            <div className={styles.modal__fields__tags__title}>Added</div>
            <div className={styles.modal__fields__tags__items}>
                {
                    Array.from(tags).map(item => (
                        <div 
                            key={item} 
                            className={styles.modal__fields__tags__item} 
                            onClick={() => removeTag(item)}
                        >
                            {item} 
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const InputTag = ({ setTags }) => {
    const [input, setInput] = useState("");

    const append = () => {
        const tags = input.split("#");
        
        for (const tag of tags) {
            const prepared = tag.trim().split(" ").join("_");

            if (prepared) {
                setTags(prev => new Set(prev.add(prepared)))
            }
        }

        setInput("");
    }

    return (
        <div className={styles.modal__fields__tag}>
            <InputControl type="text" placeholder="Tag" value={input} setValue={setInput}/>
            
            <div className={styles.modal__fields__tag__btn}>
                <Svg 
                    url={AddIcon} 
                    width="1.4" 
                    height="1.4" 
                    onClick={append}
                />
            </div>
        </div>
    )
}

const CreateRoomModalTags = ({ tags, setTags }) => {
    return (
        <div>
            <div className="mb-1">
                <div>Tags</div>
                <div className="text-placeholder"> Add tags to make it easier to find the room </div>
            </div>

            <InputTag setTags={setTags}/>
            <AddedTags tags={tags} setTags={setTags}/>
        </div>
    )
}

export default memo(CreateRoomModalTags)