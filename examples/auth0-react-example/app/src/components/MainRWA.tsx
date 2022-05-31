import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "../services/web3auth";

import Loader from "./Loader";
import styles from "../styles/Home.module.css";
import {useLocation} from "react-router-dom";

const Main = () => {
  const { provider, loginRWA, logout, getUserInfo, getAccounts, getBalance, signMessage, isLoading, signTransaction, signAndSendTransaction, chain, web3Auth, setIsLoading } = useWeb3Auth();
  const search = useLocation().search;
  const jwt = new URLSearchParams(search).get('token');
  const token = jwt == null ? "" : jwt.toString();

  const handleAuthLogin = async () => {
    try {
      setIsLoading(true);
      // alert(token);
      await loginRWA(WALLET_ADAPTERS.OPENLOGIN,"jwt", token);
    } finally {
      setIsLoading(false);
    }
  }
  // handleAuthLogin();
  const loggedInView = (
    <>
      <button onClick={getUserInfo} className={styles.card}>
        Get User Info
      </button>
      <button onClick={getAccounts} className={styles.card}>
        Get Accounts
      </button>
      <button onClick={getBalance} className={styles.card}>
        Get Balance
      </button>
      <button onClick={signMessage} className={styles.card}>
        Sign Message
      </button>

      {
        (web3Auth?.connectedAdapterName === WALLET_ADAPTERS.OPENLOGIN || chain === "solana") &&
        (<button onClick={signTransaction} className={styles.card}>
          Sign Transaction
      </button>)
      }
      <button onClick={signAndSendTransaction} className={styles.card}>
        Sign and Send Transaction
      </button>
      <button onClick={logout} className={styles.card}>
        Log Out
      </button>

      <div className={styles.console} id="console">
        <p className={styles.code}></p>
      </div>
    </>
  );
 
  const unloggedInView = (
    <div className={styles.centerFlex}>
       {/* <Loader/> */}
       <button onClick={handleAuthLogin} className={styles.card}>
        Log in
      </button>
    </div>


  );

  return isLoading ?
    (
      <div className={styles.centerFlex}>
        <Loader></Loader>
      </div>
    ): (
      <div className={styles.grid}>{provider ? loggedInView : unloggedInView}</div>
    )
};

export default Main;
