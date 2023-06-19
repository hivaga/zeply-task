import {useContext, useEffect} from "react";
import {Subject} from "rxjs";
import {AppStoreContext} from "../../../../app";
import styles from './subscriptions-page.module.scss';

export interface SubscriptionsPageProps {
}

export function SubscriptionsPage(props: SubscriptionsPageProps) {

  const appStore = useContext(AppStoreContext);
  const onDestroyComponent = new Subject<void>();

  useEffect(() => {
    console.log('Component SubscriptionsPage is update!');
    // Clean subscriptions on component destruction
    return () => {
      console.log('Component SubscriptionsPage is destroyed');
      onDestroyComponent.next();
    }
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Subscriptions Page!</h1>
    </div>
  );
}

export default SubscriptionsPage;
