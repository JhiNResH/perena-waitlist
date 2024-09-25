import React, { useState, useCallback, useRef, useEffect } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

interface CustomizedWalletProps {
  className?: string;
  style?: React.CSSProperties;
  step: number;
  canConnect: boolean;
}

const CustomizedWallet: React.FC<CustomizedWalletProps> = (props) => {
  const { step, canConnect, className, style } = props;

  const { setVisible } = useWalletModal();
  const { publicKey, connected, connecting, disconnect, select } = useWallet();

  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    console.log('CustomizedWallet rendered, state:', { 
      step, 
      canConnect, 
      connected, 
      connecting, 
      publicKey: publicKey?.toBase58() 
    });
  }, [step, canConnect, connected, connecting, publicKey]);

  const handleClick = useCallback(() => {
    console.log('Button clicked, wallet state:', { connected, connecting });
    if (!connected && !connecting) {
      setVisible(true);
    } else if (connected) {
      setMenuOpen(!menuOpen);
    }
  }, [connected, connecting, setVisible, menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  if (step !== 3 || !canConnect) {
    return null;
  }

  return (
    <div className="wallet-adapter-dropdown">
      <button
        className={`inline-block bg-[#d2bb94] text-[#3c2a4d] px-5 py-1.5 rounded-sm border border-[#3c2a4d] shadow-[1px_1px_0_#3c2a4d] hover:bg-[#c0a983] transition-all duration-300 ease-in-out text-base uppercase tracking-wider cursor-pointer active:transform active:translate-y-0.5 active:shadow-none font-['Sebastien_Slab_Round'] font-normal ${className || ""}`}
        style={style}
        onClick={handleClick}
        disabled={connecting}
      >
        {!connected ? (
          <span className="text-base font-light">Connect Wallet</span>
        ) : (
          <span className="text-base font-light">Connected</span>
        )}
      </button>
      {connected && publicKey && (
        <ul
          aria-label="dropdown-list"
          className={`wallet-adapter-dropdown-list ${menuOpen ? "wallet-adapter-dropdown-list-active" : ""}`}
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
        </ul>
      )}
    </div>
  );
};

export default CustomizedWallet;