import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import bs58 from "bs58";

interface ConnectButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onJoinWaitlist: () => void;
  step: number;
}

const ConnectButton = (props: ConnectButtonProps) => {
  const { onJoinWaitlist, step } = props;

  const { setVisible: setModalVisible } = useWalletModal();
  const { publicKey, connected, disconnect, signMessage } = useWallet();

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

  useEffect(() => {
    if (publicKey && !hasJoinedWaitlist) {
      handleJoinWaitlist();
    }
  }, [publicKey, handleJoinWaitlist, hasJoinedWaitlist]);

  const content = useMemo(() => {
    if (connected && publicKey) {
      const base58 = publicKey.toBase58();
      return (
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold" style={{ fontFamily: '"Sebastien Slab Round", serif' }}>
            {base58.slice(0, 4)}...{base58.slice(-4)}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <span className="text-lg font-plusjakartasans font-light">Connect</span>
          <span className="text-4xl font-bold mt-1">Wallet</span>
        </div>
      );
    }
  }, [connected, publicKey]);
  
  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setModalVisible(true);
    }
  };

  return (
    <div
      {...props}
      className={`inline-block bg-[#d2bb94] text-[#3c2a4d] px-5 py-1.5 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-base uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-normal ${step !== 2 ? 'pointer-events-none opacity-50' : ''} ${props.className || ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {content}
    </div>
  );
};

export default ConnectButton;