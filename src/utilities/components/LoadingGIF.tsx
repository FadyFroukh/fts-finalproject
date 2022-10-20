import styles from "../styles/utils.module.css";
const LoadingGIF = () => {
  return (
   <div className={`${styles['flex-item-center']} ${styles['flex']}`} style={{width:'100%'}}>
     <div className={styles['loading-card']}>
        <img src='pictures/loading.gif' alt='GIF Indicating Loading Progress'/>
    </div>
   </div>
  )
}

export default LoadingGIF