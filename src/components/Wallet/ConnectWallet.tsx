import React, { useCallback, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface ConnectWalletProps {
  className?: string;
  style?: React.CSSProperties;
  step: number;
  canConnect: boolean;
}

const ConnectWallet: React.FC<ConnectWalletProps> = (props) => {
  const { step, canConnect, className, style } = props;

  const { setVisible } = useWalletModal();
  const { publicKey, connected } = useWallet();

  const handleClick = useCallback(() => {
    if (!connected) {
      console.log('Opening wallet modal');
      setVisible(true);
    }
  }, [connected, setVisible]);

  useEffect(() => {
    console.log('Wallet connection state changed:', connected);
    if (connected && publicKey) {
      console.log('Wallet connected:', publicKey.toBase58());
    }
  }, [connected, publicKey]);

  if (step !== 3 || !canConnect) {
    return null;
  }

  return (
    <div
      className={`inline-block bg-[#d2bb94] text-[#3c2a4d] px-5 py-1.5 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-base uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-normal ${className || ""}`}
      style={style}
      onClick={handleClick}
    >
      {connected ? (
        <span className="text-base font-light">Connected</span>
      ) : (
        <span className="text-base font-light">Connect Wallet</span>
      )}
    </div>
  );
};

export default ConnectWallet;