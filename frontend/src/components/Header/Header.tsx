import React  from 'react'
import styles from './Header.module.scss'

const Header=({title}: Props)=>{
  return <div className={styles.header}>
    {title}
  </div>
}
export type Props={
  title: string
}

export default Header
