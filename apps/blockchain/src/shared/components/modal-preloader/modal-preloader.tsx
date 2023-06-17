import styles from './modal-preloader.module.scss';

import React from 'react';
import {CircularProgress} from '@mui/material';

export interface ModalPreloaderProps {
}

function ModalPreloader(props: ModalPreloaderProps) {
  return (<div className={styles.container}>
    <CircularProgress size={'220px'}/>
  </div>);
}

export default ModalPreloader;
