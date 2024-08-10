import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";



//copy WalletMultiButton, only modify ui, used for connect wallet
interface ConnectButtonProps {
  className?: string;
  style?: React.CSSProperties;
  openModal: () => void;  // 新增的 prop
}

const ConnectButton = (props: ConnectButtonProps) => {
  const { setVisible: setModalVisible } = useWalletModal();
  const { buttonState, onConnect, onDisconnect, publicKey } =
    useWalletMultiButton({
      onSelectWallet() {
        setModalVisible(true);
      },
    });
  const { signMessage } = useWallet();
  
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;

      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target as Node)) return;

      setMenuOpen(false);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);

  const handleJoinWaitlist = useCallback(async () => {
    if (publicKey && signMessage) {
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
        
        alert("LFG! You just joined Perena!");
      } catch (error) {
        console.error('Error:', error);
        alert("There was an error submitting your request. Please try again.");
      }
    }
  }, [publicKey, signMessage]);

  useEffect(() => {
    if (publicKey) {
      handleJoinWaitlist();
    }
  }, [publicKey, handleJoinWaitlist]);
  
    const content = useMemo(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 4) + ".." + base58.slice(-4);
    } else {
      return (
        <button className="button-waitlist" onClick={handleJoinWaitlist}>
          Join the Waitlist
        </button>
      );
    }
  }, [publicKey, handleJoinWaitlist]);
  
  return (
    <div className="wallet-adapter-dropdown">
      <div
        {...props}
        aria-expanded={menuOpen}
        className={`wallet-adapter-button-trigger
                    ${props.className ? props.className : ""}`}
        style={{
          pointerEvents: menuOpen ? "none" : "auto",
          ...props.style,
        }}
        onClick={() => {
          switch (buttonState) {
            case "no-wallet":
              setModalVisible(true);
              break;
            case "has-wallet":
              if (onConnect) {
                onConnect();
              }
              break;
            case "connected":
              setMenuOpen(true);
              break;
          }
        }}
      >
         {typeof content === 'string' ? (
          <button className="button-waitlist">{content}</button>
        ) : (
          content
        )}
      </div>
      <ul
        aria-label="dropdown-list"
        className={`wallet-adapter-dropdown-list ${
          menuOpen && "wallet-adapter-dropdown-list-active"
        }`}
        ref={ref}
        role="menu"
      >
        {publicKey ? (
          <li
            className="wallet-adapter-dropdown-list-item"
            onClick={async () => {
              await navigator.clipboard.writeText(publicKey.toBase58());
              setCopied(true);
              setTimeout(() => setCopied(false), 400);
            }}
            role="menuitem"
          >
            {copied ? "copied" : "copy address"}
          </li>
        ) : null}
        <li
          className="wallet-adapter-dropdown-list-item"
          onClick={() => {
            setModalVisible(true);
            setMenuOpen(false);
          }}
          role="menuitem"
        >
          {"change wallet"}
        </li>
        {onDisconnect ? (
          <li
            className="wallet-adapter-dropdown-list-item"
            onClick={() => {
              onDisconnect();
              setMenuOpen(false);
            }}
            role="menuitem"
          >
            {"disconnect"}
          </li>
        ) : null}
      </ul>
    </div>
  );
};
export default ConnectButton;