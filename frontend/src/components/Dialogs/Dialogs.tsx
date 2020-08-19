import React from 'react'
import Header from '../Header/Header'
import activities from '../../infrastructure/activities'
import Message from '../Message/Message'
import CustomerLayoutContainer from '../CustomerLayout/CustomerLayoutContainer'

type PropsType = {
    messages: string[]
    onMessageSend: (message: string) => void
}

const Dialogs: React.FC<PropsType> = (props: PropsType) => {
    const handleMessageSend = (e: React.ChangeEvent<HTMLInputElement>) => props.onMessageSend(e.target.value)
    console.debug('Dialogs', 'RENDER')

    return <CustomerLayoutContainer header={<Header title={activities.dialogs.name}/>}>
        <div>Информация по диалогам</div>
        <input onChange={handleMessageSend}/>
        {
            props.messages.map((messageText: string, messageIndex: number) =>
                <Message key={messageIndex}
                         text={messageText}/>)
        }
    </CustomerLayoutContainer>
}

export default Dialogs
