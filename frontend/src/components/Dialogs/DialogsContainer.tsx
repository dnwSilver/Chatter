import {connect} from 'react-redux'
import {GlobalState} from '../../stores/GlobalStore'
import {actions} from './DialogsActions'
import {dialogMessages} from './DialogsSelectors'
import Dialogs from './Dialogs'

type OwnPropsType = {}

type StatePropsType = {
    messages: string[]
}

type DispatchPropsType = {
    onMessageSend: (message: string) => void
}

const mapStateToProps = (state: GlobalState): StatePropsType => ({
    messages: dialogMessages(state)
})

export default connect<StatePropsType, DispatchPropsType, OwnPropsType, GlobalState>(mapStateToProps, {...actions})(Dialogs)
