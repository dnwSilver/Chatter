import {GlobalState} from '../../stores/GlobalStore'
import Navigation, {PropsType} from './Navigation'
import {connect} from 'react-redux'
import {actualAreas} from './NavigationSelectors'

const mapStateToProps = (state: GlobalState): PropsType => ({
    areas: actualAreas(state)
})

export default connect<PropsType, {}, {}, GlobalState>(mapStateToProps)(Navigation)
