import { useClickOutside, useKeyboardEvent } from "@react-hookz/web";
import { useRef } from "react";
import Blockies from "react-blockies";
import { MdLogout } from "react-icons/md";
import { twJoin } from "tailwind-merge";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from "wagmi";

export const UserAccountDetail = ({
  showUserAccountDetail,
  setShowUserAccountDetail,
}: {
  showUserAccountDetail: boolean;
  setShowUserAccountDetail: (showUserAccountDetail: boolean) => void;
}) => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address, chainId: 1 });
  const { data: avatarUrl } = useEnsAvatar({
    name: ensName,
    chainId: 1,
  });
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { data, isError } = useBalance({ address });

  const ref = useRef(null);

  useClickOutside(ref, () => {
    setShowUserAccountDetail(false);
  });

  const handleDisconnect = () => {
    setShowUserAccountDetail(false);
    disconnect();
  };

  // close when "escape" key pressed
  useKeyboardEvent("Escape", () => {
    setShowUserAccountDetail(false);
  });
  return (
    <div
      ref={ref}
      className={twJoin(
        "flex flex-row items-center absolute z-50 p-2 top-20 border rounded-lg bg-gray-900 border-gray-800 uppercase",
        !showUserAccountDetail && "hidden",
      )}
    >
      <div className="rounded-full mr-2">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="ENS avatar"
            className="rounded-full w-10 h-10"
          />
        ) : (
          // @ts-ignore - types are apparently wrong.
          <Blockies
            seed={address as string}
            scale={4}
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col text-left semibold font-loos">
        <span className="text-gray-500 text-xs">{chain?.name}</span>
        <span>
          {!isError
            ? `${Number(data?.formatted).toFixed(4)} ${data?.symbol}`
            : "Error fetching balance"}
        </span>
      </div>
      <button
        onClick={handleDisconnect}
        className={twJoin(!isError ? "ml-16" : "ml-8", "hover:cursor-pointer")}
      >
        <MdLogout size="20" style={{ color: "#6B7280" }} />
      </button>
    </div>
  );
};
