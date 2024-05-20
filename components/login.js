import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Payment } from './payment'
import { Wallet } from '@project-serum/anchor'

const styles = {
  loginPage: `w-screen h-screen bg-white flex justify-center flex-col items-center`,
  text: `text-4xl text-black mb-10`,
}

const Login = () => {
  const wallet = useWallet()

  /** show payment UI if wallet is connected */
  if (wallet.connected) return <Payment/>

  return (
    <div className={styles.loginPage}>
      <p className={styles.text}>Login to access this app</p>
      <WalletMultiButton/>
    </div>
  )
}

export default Login


