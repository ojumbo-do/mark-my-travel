import styles from "./CityItem.module.css";

function CityItem({ city }) {
  const { cityName, emoji, date } = city;

  const dateFormat = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({dateFormat(date)})</time>
    </li>
  );
}

export default CityItem;
