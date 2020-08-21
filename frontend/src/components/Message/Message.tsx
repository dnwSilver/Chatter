import React, {FC} from 'react'

const Message: FC<Props> = ({text}): JSX.Element => {
    return <div>
        {text}
    </div>
}

type Props = {
    text: string
}

export default Message
