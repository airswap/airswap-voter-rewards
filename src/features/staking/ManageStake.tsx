import { Dispatch } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { twJoin } from "tailwind-merge";
import AirSwapLogo from "../../assets/airswap-logo.svg";
import { useTokenBalances } from "../../hooks/useTokenBalances";
import { Button } from "../common/Button";
import { LineBreak } from "../common/LineBreak";
import { NumberInput } from "./NumberInput";
import { StakableBar } from "./StakableBar";
import { StakeOrUnstake, Status } from "./types/StakingTypes";

export const ManageStake = ({
  displayManageStake = true,
  formReturn,
  stakeOrUnstake,
  setStakeOrUnstake,
  loadingStatus,
}: {
  displayManageStake: boolean;
  formReturn: UseFormReturn<FieldValues>;
  stakeOrUnstake: StakeOrUnstake;
  setStakeOrUnstake: Dispatch<StakeOrUnstake>;
  loadingStatus: Status[];
}) => {
  const {
    astBalanceFormatted: astBalance,
    ustakableSAstBalanceFormatted: unstakableSAstBalance,
  } = useTokenBalances();

  const isButtonDisabled = loadingStatus.some((status) => status === "loading");

  return (
    <div className={`${!displayManageStake && "hidden"}`}>
      <LineBreak />
      <StakableBar />
      <LineBreak />
      <div className="font-lg pointer-cursor mt-6 rounded-md font-semibold">
        <Button
          className={twJoin([
            "rounded-none rounded-l-md",
            "w-1/2 text-sm uppercase",
            `${stakeOrUnstake === "stake" && "bg-bg-darkShaded"}`,
            `${isButtonDisabled && "opacity-50"}`,
          ])}
          onClick={() => setStakeOrUnstake(StakeOrUnstake.STAKE)}
          disabled={isButtonDisabled}
        >
          Stake
        </Button>
        <Button
          className={twJoin(
            "rounded-none rounded-r-md",
            "w-1/2 text-sm uppercase",
            `${stakeOrUnstake === "unstake" && "bg-bg-darkShaded"}`,
          )}
          onClick={() => setStakeOrUnstake(StakeOrUnstake.UNSTAKE)}
          disabled={isButtonDisabled}
        >
          Unstake
        </Button>
      </div>
      <div
        className={twJoin(
          "my-3 rounded px-4 py-3 text-sm",
          "dark:bg-bg-darkShaded",
        )}
      >
        Stake AST prior to voting on proposals. The amount of tokens you stake
        determines the weight of your vote. Tokens unlock linearly over 20
        weeks.
      </div>
      <div className="flex items-center justify-between rounded border border-border-darkShaded bg-black px-4 py-2">
        <img src={AirSwapLogo} alt="AirSwap Logo" className="h-8 w-8 " />
        <div className="flex flex-col text-right  uppercase">
          <div>
            <NumberInput
              astBalance={astBalance.toString()}
              formReturn={formReturn}
              name="stakingAmount"
            />
          </div>
          <div className="text-xs space-x-1">
            <span>
              {stakeOrUnstake === StakeOrUnstake.STAKE
                ? astBalance
                : unstakableSAstBalance}
            </span>
            <span>
              {stakeOrUnstake === StakeOrUnstake.STAKE
                ? "stakable"
                : "unstakable"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};