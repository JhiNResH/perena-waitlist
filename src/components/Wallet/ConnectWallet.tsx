import React, { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import bs58 from "bs58";

interface ConnectButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onJoinWaitlist: () => void;
  step: number;
  canConnect: boolean;
}

const ConnectButton: React.FC<ConnectButtonProps> = (props) => {
  const { onJoinWaitlist, step, canConnect, className, style } = props;

  const { setVisible } = useWalletModal();
  const { publicKey, connected, signMessage } = useWallet();

  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false);

  const handleJoinWaitlist = useCallback(async () => {
    if (publicKey && signMessage && !hasJoinedWaitlist) {
      try {
        const message = new TextEncoder().encode(`Join waitlist for ${publicKey.toBase58()}`);
        const signature = await signMessage(message);
        const signatureBase58 = bs58.encode(signature);

        await fetch(
          'https://script.google.com/macros/s/AKfycbzuNNizoAFYvG0q2kitX8ryaZt2qpmXpP9RGbv2Tar57mm7UOku-jis5mSXlO6xxQzH/exec',
          {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            publicKey: publicKey.toBase58(),
            signature: signatureBase58,
          }),
        });
        
        setHasJoinedWaitlist(true);
        onJoinWaitlist();

      } catch (error) {
        console.error('Error:', error);
        alert("There was an error submitting your request. Please try again.");
      }
    }
  }, [publicKey, signMessage, onJoinWaitlist, hasJoinedWaitlist]);

  const handleClick = () => {
    if (connected) {
      handleJoinWaitlist();
    } else {
      setVisible(true);  // 這裡會打開錢包連接模態框
    }
  };

  // 只在 step 為 3 且 canConnect 為 true 時渲染按鈕
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
        <span className="text-base font-light">Join Waitlist</span>
      ) : (
        <span className="text-base font-light">Connect Wallet</span>
      )}
    </div>
  );
};

export default ConnectButton;