import {useContext, useEffect, useState} from "react";
import {Subject} from "rxjs";
import {AppStoreContext} from "../../../../app";
import {AddressSearchRow, ISearchStatisticRow} from "../address-search-row/address-search-row";
import styles from './statistics-page.module.scss';

export interface StatisticsPageProps {
}

export function StatisticsPage(props: StatisticsPageProps) {

  const appStore = useContext(AppStoreContext);
  const onDestroyComponent = new Subject<void>();
  const searchesMap = new Map<string, ISearchStatisticRow>();

  appStore.$searches.value.map((search) => {
    const searchRow = searchesMap.get(search.hash) ?? {count: 0, form: search};
    searchRow.count++;
    searchesMap.set(search.hash, searchRow);
  })

  const sortedSearchesList = [...searchesMap.values()];
  sortedSearchesList.sort((a, b) => a.count - b.count);
  sortedSearchesList.reverse();
  const [searchesList] = useState<ISearchStatisticRow[]>(sortedSearchesList)

  useEffect(() => {
    console.log('Component StatisticsPage is update!');
    // Clean subscriptions on component destruction
    return () => {
      console.log('Component StatisticsPage is destroyed');
      onDestroyComponent.next();
    }
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Search Statistics</h1>
      <div className={styles.searchListContainer}>
        {searchesList.map((item, index) => (
          <AddressSearchRow data={item} />
        ))}
      </div>
    </div>
  );
}

export default StatisticsPage;
