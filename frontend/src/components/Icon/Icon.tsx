import React, {FC} from 'react'
import {IconType} from '../../infrastructure/IconTypes'

type PropsType = {
    type: IconType
    // color?: Color
    title?: string
} & React.SVGProps<SVGSVGElement>

const Icon: FC<PropsType> = ({title, type}): JSX.Element | null => {
    const ImportedIconRef = React.useRef<React.FC<React.SVGProps<SVGSVGElement>>>()
    const [loading, setLoading] = React.useState(true)

    React.useEffect((): void => {
        setLoading(true)
        const importIcon = async (): Promise<void> => {
            ImportedIconRef.current = (await import(`./images/${type.toString()}.svg`)).ReactComponent
        }
        importIcon().catch(err => {
            alert(err)
            throw err
        }).finally(() => setLoading(false))
    }, [type])

    if (!loading && ImportedIconRef.current) {
        const {current: ImportedIcon} = ImportedIconRef
        return <ImportedIcon/>
    }

    return null
}

export default Icon
