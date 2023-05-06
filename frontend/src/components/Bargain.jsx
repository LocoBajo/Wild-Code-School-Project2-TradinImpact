import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Bargain.module.css";
import JanKenPon from "./JanKenPon";
import Merchant from "./Merchant";
import { useCombatContext } from "../contexts/CombatContext";
import Recap from "./Recap";

export default function Bargain({
  tradeScreen,
  setTradeScreen,
  portrait,
  selectedItem,
  showRecap,
  setShowRecap,
  setSelectedItem,
  buyOrSell,
  merchantName,
  itemPrice,
  moraCount,
  setMoraCount,
  itemQuantity,
  inventory,
  setInventory,
  playerBet,
}) {
  const { enemyChoice, result } = useCombatContext();

  /* Sert à stocker la valeur du résultat du match car avec le state result initial,
  la valeur est reset au bout de 2sec */
  const [bargainResult, setBargainResult] = useState("");
  // const [bargainPrice, setBargainPrice] = useState(itemPrice);
  const selection = selectedItem;
  let itemGot = false;

  /* Affiche le recap en cas de win ou de lose avec un délai de 2sec pour laisser le temps
  au joueur de voir le résultat à l'écran, et défini le prix final de ou des objets */
  useEffect(() => {
    if (result === "win" || result === "lose") {
      // Stock le résultat du combat afin de pouvoir le réutiliser pour l'affichage du récap
      setBargainResult(result);
      setTimeout(() => {
        /* Met à jour le solde de mora en fonction de l'issue du combat et du fait que l'on 
        cherche à vendre ou acheter un objet */
        if (buyOrSell === "buy") {
          if (bargainResult === "win") {
            setMoraCount(moraCount - playerBet);
          } else if (bargainResult === "lose") {
            if (itemPrice > moraCount) {
              setMoraCount(0);
            } else {
              setMoraCount(moraCount - itemPrice);
            }
          }
          // Ajout de l'objet dans l'inventaire
          for (const item of inventory) {
            if (item.name === selectedItem.name) {
              item.possessed += 1;
              itemGot = true;
            }
          }
          if (itemGot === false) {
            selection.possessed = 1;
            setInventory([...inventory, selection]);
          }
        } else if (buyOrSell === "sell") {
          if (bargainResult === "win") {
            setMoraCount(moraCount + playerBet * itemQuantity);
          } else {
            setMoraCount(moraCount + itemPrice * itemQuantity);
          }
          // Retrait du ou des objets de l'inventaire
          selection.possessed -= itemQuantity;
        }
        setShowRecap(true);
      }, 2000);
    }
  }, [result]);

  return (
    <div className={styles.bargain}>
      <div className={styles.merchant}>
        <Merchant portrait={portrait} />
        <h6>"Let's settle this in one round"</h6>
        {enemyChoice !== "" && (
          <div className={styles.enemyChoice}>
            <img src={`./src/assets/${enemyChoice}.png`} alt={enemyChoice} />
          </div>
        )}
      </div>
      {result === "win" && (
        <div className={`${styles.result} ${styles.win}`}>You win</div>
      )}
      {result === "draw" && (
        <div className={`${styles.result} ${styles.draw}`}>
          Draw, let's try again
        </div>
      )}
      {result === "lose" && (
        <div className={`${styles.result} ${styles.lose}`}>You lost</div>
      )}
      <JanKenPon />
      {showRecap === true && (
        <Recap
          tradeScreen={tradeScreen}
          setTradeScreen={setTradeScreen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setShowRecap={setShowRecap}
          buyOrSell={buyOrSell}
          bargainResult={bargainResult}
          merchantName={merchantName}
          itemPrice={itemPrice}
          itemQuantity={itemQuantity}
        />
      )}
    </div>
  );
}

Bargain.propTypes = {
  tradeScreen: PropTypes.string.isRequired,
  setTradeScreen: PropTypes.func.isRequired,
  portrait: PropTypes.string.isRequired,
  selectedItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sources: PropTypes.arrayOf.isRequired,
  }).isRequired,
  showRecap: PropTypes.bool.isRequired,
  setShowRecap: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  buyOrSell: PropTypes.string.isRequired,
  merchantName: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  moraCount: PropTypes.number.isRequired,
  setMoraCount: PropTypes.func.isRequired,
  itemQuantity: PropTypes.number.isRequired,
  inventory: PropTypes.string.isRequired,
  setInventory: PropTypes.func.isRequired,
  playerBet: PropTypes.string.isRequired,
};
