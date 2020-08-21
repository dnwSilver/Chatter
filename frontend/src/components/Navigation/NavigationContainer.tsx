import {GlobalStore} from '../../redux/globalStore'
import Navigation, {Props} from './Navigation'
import {connect} from 'react-redux'
import {actualAreas} from '../../redux/selectors/navigationSelectors'

const mapStateToProps = (state: GlobalStore): Props => ({
    areas: actualAreas(state)
})

export default connect<Props, {}, {}, GlobalStore>(mapStateToProps)(Navigation)
