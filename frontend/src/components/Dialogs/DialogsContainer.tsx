import {connect}        from 'react-redux'
import {actions}        from '../../redux/actions/dialogsActions'
import {GlobalStore}    from '../../redux/globalStore'
import {dialogMessages} from '../../redux/selectors/dialogsSelectors'
import Dialogs          from './Dialogs'

type StateProps={
  messages: string[]
}

type DispatchProps={
  onMessageSend: (message: string)=>void
}

const mapStateToProps=(state: GlobalStore): StateProps=>({
  messages: dialogMessages(state)
})

export default connect<StateProps, DispatchProps, {}, GlobalStore>(mapStateToProps, {...actions})(Dialogs)
