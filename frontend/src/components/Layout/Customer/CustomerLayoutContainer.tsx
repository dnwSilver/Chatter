import React, {FC} from 'react'
import CustomerLayout from './CustomerLayout'
import {connect} from 'react-redux'
import {GlobalState} from '../../../stores/redux-store'
import Platform from '../../../contexts/platforms/Platform'
import usePlatform from '../../../contexts/platforms/PlatformHook'

type OwnPropsType = {
    header: React.ReactNode
    body: React.ReactNode
}

type StatePropsType = {}

type PropsType = StatePropsType & OwnPropsType

const CustomerLayoutContainer: FC<PropsType> = (props: PropsType) => {
    const platform = usePlatform()

    switch (platform) {
        case Platform.Desktop:
            return <>
                <div>Desktop</div>
                <CustomerLayout header={props.body}
                                body={props.body}/>
            </>
        case Platform.Mobile:
            return <>
                <div>Mobile</div>
                <CustomerLayout header={props.body}
                                body={props.body}/>
            </>
        default:
            return <></>
    }
}

const mapStateToProps = (state: GlobalState): StatePropsType => ({})

export default connect(mapStateToProps)(CustomerLayoutContainer)
