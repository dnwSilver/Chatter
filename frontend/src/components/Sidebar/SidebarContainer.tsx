import {GlobalStore} from '../../redux/globalStore'
import Sidebar from './Sidebar'
import {connect} from 'react-redux'
import {actualAreas} from '../../redux/selectors/navigationSelectors'
import {Area} from '../../infrastructure/activities/areas'

type StateProps = {
    areas: Area[]
}

const mapStateToProps = (state: GlobalStore): StateProps => ({
    areas: actualAreas(state)
})

export default connect<StateProps, {}, {}, GlobalStore>(mapStateToProps)(Sidebar)
