import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
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

  const { setVisible/*: setVisible*/ } = useWalletModal();
  const { publicKey, connected, connecting, disconnect, signMessage } = useWallet();

  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    console.log('Wallet state changed:', { connected, connecting, publicKey: publicKey?.toBase58() });
  }, [connected, connecting, publicKey]);

  const handleJoinWaitlist = useCallback(async () => {
    if (publicKey && signMessage && !hasJoinedWaitlist) {
      try {
        console.log('Attempting to join waitlist');
        const message = new TextEncoder().encode(`Join waitlist for ${publicKey.toBase58()}`);
        const signature = await signMessage(message);
        const signatureBase58 = bs58.encode(signature);

        const response = await fetch(
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
          }
        );
        
        console.log('Waitlist join response:', response);
        setHasJoinedWaitlist(true);
        onJoinWaitlist();
      } catch (error) {
        console.error('Error joining waitlist:', error);
        alert("There was an error submitting your request. Please try again.");
      }
    }
  }, [publicKey, signMessage, onJoinWaitlist, hasJoinedWaitlist]);

  const handleClick = useCallback(() => {
    console.log('Button clicked, wallet state:', { connected, connecting });
    if (!connected && !connecting) {
      try {
        console.log('Opening wallet modal');
        setVisible(true);
      } catch (error) {
        console.error('Error opening wallet modal:', error);
      }
    } else if (connected && !hasJoinedWaitlist) {
      console.log('Wallet connected, joining waitlist');
      handleJoinWaitlist();
    } else {
      console.log('Toggle menu');
      setMenuOpen((prev) => !prev);
    }
  }, [connected, connecting, setVisible, handleJoinWaitlist, hasJoinedWaitlist]);

  const content = useMemo(() => {
    if (connecting) return <span className="text-base font-light">Connecting...</span>;
    if (connected) {
      return (
        <span className="text-base font-light">
          {hasJoinedWaitlist ? "Waitlist Joined" : "Join Waitlist"}
        </span>
      );
    }
    return <span className="text-base font-light">Connect Wallet</span>;
  }, [connecting, connected, hasJoinedWaitlist]);

  console.log('Rendering ConnectButton, step:', step, 'canConnect:', canConnect, 'connected:', connected);
  if (step !== 3 || !canConnect) {
    return null;
  }

  return (
    <div className="wallet-adapter-dropdown">
      <div
        className={`inline-block bg-[#d2bb94] text-[#3c2a4d] px-5 py-1.5 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-base uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-normal ${className || ""}`}
        style={{
          pointerEvents: menuOpen ? "none" : "auto",
          ...style,
        }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        {content}
      </div>
      {connected && publicKey && (
        <ul
          aria-label="dropdown-list"
          className={`wallet-adapter-dropdown-list ${
            menuOpen ? "wallet-adapter-dropdown-list-active" : ""
          }`}
          ref={ref}
          role="menu"
        >
          <li
            className="wallet-adapter-dropdown-list-item"
            onClick={async () => {
              await navigator.clipboard.writeText(publicKey.toBase58());
              setCopied(true);
              setTimeout(() => setCopied(false), 400);
            }}
            role="menuitem"
          >
            {copied ? "Copied" : "Copy address"}
          </li>
          <li
            className="wallet-adapter-dropdown-list-item"
            onClick={() => {
              setVisible(true);
              setMenuOpen(false);
            }}
            role="menuitem"
          >
            Change wallet
          </li>
          {disconnect && (
            <li
              className="wallet-adapter-dropdown-list-item"
              onClick={() => {
                disconnect();
                setMenuOpen(false);
              }}
              role="menuitem"
            >
              Disconnect
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ConnectButton;