import styles from '../styles/utils.module.css';
type ActionsProps = {
    children:React.ReactNode
};

const Actions = ({children}:ActionsProps) => {
  return (
    <div className={styles['actions']}>
        {children}
    </div>
  )
}

export default Actions