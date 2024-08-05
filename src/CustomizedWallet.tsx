import React, { useEffect, useState, useMemo, useRef } from "react";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

//copy WalletMultiButton, only modify ui, used for connect wallet
type ConnectButtonProps = {
  className?: string;
  style?: React.CSSProperties;
};

const ConnectButton = (props: ConnectButtonProps) => {
  const { setVisible: setModalVisible } = useWalletModal();
  const { buttonState, onConnect, onDisconnect, publicKey } =
    useWalletMultiButton({
      onSelectWallet() {
        setModalVisible(true);
      },
    });
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
  const content = useMemo(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 4) + ".." + base58.slice(-4);
    } else {
      return (
        <button className="button-waitlist">
          Join the Waitlist
        </button>
      );
    }
  }, [publicKey]);

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
        {content}
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