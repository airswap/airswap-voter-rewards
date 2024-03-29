import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ContractTypes } from "../../../config/ContractAddresses";
import { useContractAddresses } from "../../../config/hooks/useContractAddress";
import { stakingAbi } from "../../../contracts/stakingAbi";

export const useStakeAst = ({
  stakingAmount,
  enabled = true,
}: {
  stakingAmount: bigint;
  enabled?: boolean;
}) => {
  const [airSwapStaking] = useContractAddresses(
    [ContractTypes.AirSwapStaking_latest],
    {
      defaultChainId: 1,
      useDefaultAsFallback: false,
    },
  );

  const { config: configStake } = usePrepareContractWrite({
    address: airSwapStaking.address,
    abi: stakingAbi,
    functionName: "stake",
    args: [stakingAmount],
    enabled: enabled,
  });

  return useContractWrite(configStake);
};
