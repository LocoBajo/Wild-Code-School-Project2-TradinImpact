import PropTypes from "prop-types";
import styles from "./TradeItemDisplay.module.css";

export default function TradeItemDisplay({ tradeScreen, selectedItem }) {
  return (
    <div>
      {tradeScreen === "buy" ? (
        <div className={styles.randomItemDisplay}>
          <div className={styles.randomItemImg}>
            <img
              src={`https://api.genshin.dev/materials/cooking-ingredients/${selectedItem.name
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              alt={selectedItem.name}
            />
          </div>
          <div className={styles.randomItemName}>
            <h2>{selectedItem ? selectedItem.name : null}</h2>
          </div>
        </div>
      ) : (
        <div className={styles.randomItemDisplay}>
          <div className={styles.randomItemImg}>
            {selectedItem.sources ? (
              <img
                src={`https://api.genshin.dev/materials/cooking-ingredients/${selectedItem.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                alt={`${selectedItem.name}`}
              />
            ) : (
              <img
                src={`https://api.genshin.dev/materials/common-ascension/${selectedItem.name
                  .toLowerCase()
                  .replaceAll(" ", "-")
                  .replaceAll("'", "-")}`}
                alt={selectedItem.name}
              />
            )}
          </div>
          <div className={styles.randomItemName}>
            <h2>{selectedItem.name} </h2>
          </div>
        </div>
      )}
    </div>
  );
}

TradeItemDisplay.propTypes = {
  tradeScreen: PropTypes.string.isRequired,
  selectedItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sources: PropTypes.arrayOf.isRequired,
  }).isRequired,
};
