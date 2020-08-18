import {connect} from 'react-redux'
import {GlobalState} from '../../stores/redux-store'
import {actions} from './DialogsActions'
import {dialogMessages} from './DialogsSelectors'
import Dialogs from './Dialogs'

const mapStateToProps = (state: GlobalState): StatePropsType => ({
    messages: dialogMessages(state)
})

type OwnPropsType = {}

export type StatePropsType = {
    messages: string[]
}

export type DispatchPropsType = {
    onMessageSend: (message: string) => void
}

export default connect<StatePropsType, DispatchPropsType, OwnPropsType, GlobalState>(mapStateToProps, {...actions})(Dialogs)
