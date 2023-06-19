import styles from './subscriptions-page.module.scss';

/* eslint-disable-next-line */
export interface SubscriptionsPageProps {}

export function SubscriptionsPage(props: SubscriptionsPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SubscriptionsPage!</h1>
    </div>
  );
}

export default SubscriptionsPage;
