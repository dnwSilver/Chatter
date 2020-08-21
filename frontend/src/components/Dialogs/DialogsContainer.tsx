import {connect} from 'react-redux'
import {GlobalStore} from '../../redux/globalStore'
import Dialogs from './Dialogs'
import {actions} from '../../redux/actions/dialogsActions'
import {dialogMessages} from '../../redux/selectors/dialogsSelectors'

type StateProps = {
    messages: string[]
}

type DispatchProps = {
    onMessageSend: (message: string) => void
}

const mapStateToProps = (state: GlobalStore): StateProps => ({
    messages: dialogMessages(state)
})

export default connect<StateProps, DispatchProps, {}, GlobalStore>(mapStateToProps, {...actions})(Dialogs)
