import {GlobalState} from '../../stores/redux-store'
import Sidebar, {PropsType} from './Sidebar'
import {connect} from 'react-redux'
import {actualAreas} from './SidebarSelectors'

const mapStateToProps = (state: GlobalState): PropsType => ({
    areas: actualAreas(state)
})

export default connect<PropsType, {}, {}, GlobalState>(mapStateToProps)(Sidebar)
