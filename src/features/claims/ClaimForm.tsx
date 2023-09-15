import BigNumber from "bignumber.js";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { zeroAddress } from "viem";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { ContractTypes } from "../../config/ContractAddresses";
import { useContractAddresses } from "../../config/hooks/useContractAddress";
import { poolAbi } from "../../contracts/poolAbi";
import { Button } from "../common/Button";
import { useClaimSelectionStore } from "../votes/store/useClaimSelectionStore";
import { ClaimableTokensLineItem } from "./ClaimableTokensLineItem";
import { useClaimableAmounts } from "./hooks/useClaimableAmounts";
import { useResetClaimStatus } from "./hooks/useResetClaimStatus";

export const ClaimForm = ({}: {}) => {
  const [pool] = useContractAddresses([ContractTypes.AirSwapPool], {});
  const { address: connectedAccount } = useAccount();

  const [
    pointsClaimableByEpoch,
    allClaims,
    selectedClaims,
    clearSelectedClaims,
    setShowClaimModal,
  ] = useClaimSelectionStore((state) => [
    state.pointsClaimableByEpoch,
    state.allClaims,
    state.selectedClaims,
    state.clearSelectedClaims,
    state.setShowClaimModal,
  ]);

  const _selectedClaims = selectedClaims.length ? selectedClaims : allClaims;

  const resetClaimStatuses = useResetClaimStatus(
    _selectedClaims.map((c) => c.tree),
  );

  const totalPointsClaimable = Object.values(pointsClaimableByEpoch).reduce(
    (acc, epoch) => acc + epoch,
    0,
  );

  const pointsSelected = _selectedClaims.reduce(
    (acc, { value }) => acc + value,
    0,
  );

  const { data: claimable, refetch: refetchClaimable } = useClaimableAmounts(
    pointsSelected || totalPointsClaimable,
  );

  const [selection, setSelection] = useState<{
    index: number;
    tokenAddress: `0x${string}`;
    amount: bigint;
  }>();

  const { config: claimTxConfig } = usePrepareContractWrite({
    ...pool,
    abi: poolAbi,
    functionName: "withdraw",
    args: [
      // claims
      _selectedClaims.map((claim) => ({
        ...claim,
        value: BigInt(
          new BigNumber(claim.value).multipliedBy(10 ** 4).toFixed(0),
        ),
      })),
      selection?.tokenAddress || zeroAddress,
      selection?.amount || 0n,
      connectedAccount!,
    ],
    enabled: !!selection,
  });

  const { data, write } = useContractWrite({
    ...claimTxConfig,
    onSuccess: () => {
      resetClaimStatuses();
      clearSelectedClaims();
      refetchClaimable();
      setShowClaimModal(false);
      // TODO: show toast.
    },
  });

  return (
    <div className="flex flex-col w-[304px]">
      <div className="flex flex-row justify-between items-center mb-1 text-xl font-bold">
        <h2 className="text-white">Claim</h2>
        <MdClose
          className="text-gray-500"
          size={24}
          onClick={() => setShowClaimModal(false)}
        />
      </div>
      <h3 className="text-gray-400">
        Using {pointsSelected} out of {totalPointsClaimable} points
      </h3>

      <hr className="border-gray-800 -mx-6 my-6" />

      {/* TODO: needs a loading state */}
      <div
        className="grid items-center gap-x-5 gap-y-4"
        style={{
          gridTemplateColumns: "auto 1fr auto",
        }}
      >
        {claimable
          .filter(
            ({ claimableAmount, price, tokenInfo }) =>
              tokenInfo?.decimals &&
              claimableAmount &&
              price &&
              tokenInfo.symbol,
          )
          .map((claimOption, i) => (
            <ClaimableTokensLineItem
              isSelected={selection?.index === i}
              onSelect={() => {
                if (
                  !claimOption.claimableAmount ||
                  !claimOption.tokenInfo?.address
                )
                  return;
                setSelection({
                  amount: claimOption.claimableAmount,
                  index: i,
                  tokenAddress: claimOption.tokenInfo.address,
                });
              }}
              amount={claimOption.claimableAmount || 0n}
              decimals={claimOption.tokenInfo?.decimals || 18}
              symbol={claimOption.tokenInfo?.symbol || "N/A"}
              value={claimOption.claimableValue || 0}
              key={claimOption.tokenInfo?.address || i}
            />
          ))}
      </div>

      <Button color="primary" rounded={false} className="mt-7" onClick={write}>
        Claim
      </Button>
    </div>
  );
};
