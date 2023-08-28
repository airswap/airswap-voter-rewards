import { create } from "zustand";

export type Claim = {
  tree: `0x${string}`;
  /**
   * NOTE: This is a number of points, it needs to be converted to a bigint
   * before it is sent to the contract.
   */
  value: number;
  proof: `0x${string}`[];
};

export type SelectedClaimState = {
  /** Whether or not we are showing the claim modal */
  showClaimModal: boolean;
  /** An array of the currently selected claims - will be sent to contract
   * via claim modal.
   */
  selectedClaims: Claim[];
  /** Amount of points claimable by epoch - set by the past epoch card when the
   * claim is loaded, and used by the claim float to determine the total number
   * of points available for claiming.
   */
  pointsClaimableByEpoch: Record<string, number>;
  setPointsClaimableForEpoch: (epoch: string, points: number) => void;

  setClaimSelected: (claim: Claim, selected: boolean) => void;
  toggleClaimSelected: (claim: Claim) => void;
  clearSelectedClaims: () => void;
  setShowClaimModal: (show: boolean) => void;
  isClaimSelected: (tree: string) => boolean;
};

export const useClaimSelectionStore = create<SelectedClaimState>(
  (set, get) => ({
    selectedClaims: [],
    pointsClaimableByEpoch: {},
    showClaimModal: false,
    setPointsClaimableForEpoch(epoch: string, points: number) {
      set((state) => {
        const pointsClaimableByEpoch = {
          ...state.pointsClaimableByEpoch,
          [epoch]: points,
        };
        return { pointsClaimableByEpoch };
      });
    },
    setClaimSelected(claim: Claim, selected: boolean) {
      set((state) => {
        const selectedClaims = selected
          ? [...state.selectedClaims, claim]
          : state.selectedClaims.filter((c) => c.tree !== claim.tree);
        return { selectedClaims };
      });
    },
    isClaimSelected(tree: string) {
      return !!get().selectedClaims.find((c) => c.tree === tree);
    },
    toggleClaimSelected(claim: Claim) {
      get().setClaimSelected(claim, !get().isClaimSelected(claim.tree));
    },
    clearSelectedClaims() {
      set({ selectedClaims: [] });
    },
    setShowClaimModal(show: boolean) {
      set({ showClaimModal: show });
    },
  }),
);
