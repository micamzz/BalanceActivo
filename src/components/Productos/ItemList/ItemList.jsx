import Item from '../Item/Item.jsx';
import styles from './ItemList.module.css';

export function ItemList({ productos }) {
  return (
    <div className={styles.grid}>
      {productos.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ItemList;