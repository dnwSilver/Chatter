import {connect}           from 'react-redux'
import {GlobalStore}       from '../../redux/globalStore'
import {actualAreas}       from '../../redux/selectors/navigationSelectors'
import Navigation, {Props} from './Navigation'

const mapStateToProps=(state: GlobalStore): Props=>({
  areas: actualAreas(state)
})

export default connect<Props, {}, {}, GlobalStore>(mapStateToProps)(Navigation)
