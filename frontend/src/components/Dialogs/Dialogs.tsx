import React                   from 'react'
import activities              from '../../infrastructure/activities/activities'
import CustomerLayoutContainer from '../CustomerLayout/CustomerLayoutContainer'
import Header                  from '../Header/Header'
import Message                 from '../Message/Message'

const Dialogs=({messages, onMessageSend}: Props)=>{
  const handleMessageSend=(e: React.ChangeEvent<HTMLInputElement>): void=>onMessageSend(e.target.value)

  return <CustomerLayoutContainer header={<Header title={activities.dialogs.name}/>}>
    <div>Информация по диалогам</div>
    <input onChange={handleMessageSend}/>
    {
      messages.map((messageText: string, messageIndex: number)=>
        <Message key={messageIndex}
                 text={messageText}/>)
    }
  </CustomerLayoutContainer>
}

type Props={
  messages: string[]
  onMessageSend: (message: string)=>void
}

export default Dialogs
