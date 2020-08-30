import React from 'react'

const Message = ({text}:Props) => {
    return <div>
        {text}
    </div>
}

type Props = {
    text: string
}

export default Message
