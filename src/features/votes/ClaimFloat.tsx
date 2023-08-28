import { format } from "@greypixel_/nicenumbers";
import { AnimatePresence, motion } from "framer-motion";
import { twJoin } from "tailwind-merge";
import { Button } from "../common/Button";
import { useClaimSelectionStore } from "./store/useClaimSelectionStore";

export const ClaimFloat = ({
  onClaimClicked,
}: {
  onClaimClicked: () => void;
}) => {
  const [selectedClaims, pointsClaimableByEpoch, showClaimModal] =
    useClaimSelectionStore((state) => [
      state.selectedClaims,
      state.pointsClaimableByEpoch,
      state.showClaimModal,
    ]);

  const totalPointsClaimable =
    selectedClaims.length > 0
      ? selectedClaims.reduce((acc, claim) => acc + claim.value, 0)
      : Object.values(pointsClaimableByEpoch).reduce(
          (acc, epoch) => acc + epoch,
          0,
        );

  const isVisible = totalPointsClaimable > 0 && !showClaimModal;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            translateY: "150%",
          }}
          animate={{
            translateY: "0%",
          }}
          exit={{
            translateY: "150%",
          }}
          key="ClaimPopover"
          className={twJoin(
            // position at bottom of container.
            "absolute bottom-4 right-0 left-0",
            "bg-[#101217] flex flex-row justify-between p-5 rounded-md",
            "border border-border-dark",
            "shadow-[0_0_10px_8px] shadow-[#060607]",
          )}
        >
          <div className="flex flex-col">
            <span className="text-dark-inactive font-bold text-xs uppercase">
              Total {selectedClaims.length ? "Selected" : "Available"}
            </span>

            <span className="text-[22px] leading-6 font-bold text-white">
              {format(totalPointsClaimable, {
                tokenDecimals: 0,
                minDecimalPlaces: 0,
                significantFigures: 3,
              })}{" "}
              Points
            </span>
          </div>

          <Button color="primary" rounded={false} onClick={onClaimClicked}>
            {selectedClaims.length ? "Claim Selected" : "Claim All"}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
