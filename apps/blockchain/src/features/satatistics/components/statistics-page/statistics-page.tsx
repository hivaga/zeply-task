import styles from './statistics-page.module.scss';

/* eslint-disable-next-line */
export interface StatisticsPageProps {}

export function StatisticsPage(props: StatisticsPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StatisticsPage!</h1>
    </div>
  );
}

export default StatisticsPage;
