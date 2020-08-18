import React, {FC} from 'react'
import {PlatformContext} from '../../../contexts/platforms/PlatformContext'
import CustomerLayout from './CustomerLayout'
import {connect} from 'react-redux'
import Platform from '../../../contexts/platforms/Platform'

type OwnPropsType = {
    header: React.ReactNode
    body: React.ReactNode
}

type PropsType = OwnPropsType

const CustomerLayoutContainer: FC<PropsType> = (props: PropsType) => {

    return <PlatformContext.Consumer>
        {
            value => {
                return <>
                    {
                        value === Platform.Desktop &&
                        <div>Desktop</div>
                    }
                    {
                        value === Platform.Mobile &&
                        <div>Mobile</div>
                    }
                    <CustomerLayout header={props.body}
                                    body={props.body}/>
                </>
            }
        }
    </PlatformContext.Consumer>

}

export default connect()(CustomerLayoutContainer)
