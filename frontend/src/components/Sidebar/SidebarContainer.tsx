import {connect}     from 'react-redux'
import {Area}        from '../../infrastructure/activities/areas'
import {GlobalStore} from '../../redux/globalStore'
import {actualAreas} from '../../redux/selectors/navigationSelectors'
import Sidebar       from './Sidebar'

type StateProps={
  areas: Area[]
}

const mapStateToProps=(state: GlobalStore): StateProps=>({
  areas: actualAreas(state)
})

export default connect<StateProps, {}, {}, GlobalStore>(mapStateToProps)(Sidebar)
