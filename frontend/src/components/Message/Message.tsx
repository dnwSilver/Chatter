import React from 'react'

type PropsType = {
    text: string
}

const Message = (props: PropsType) => {
    return <div>
        {props.text}
    </div>
}

export default Message
