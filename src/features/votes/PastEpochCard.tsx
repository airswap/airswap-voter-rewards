import { useEffect, useMemo } from "react";
import { MdClose, MdOpenInNew } from "react-icons/md";
import { twJoin, twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";
import { Accordion } from "../common/Accordion";
import { Checkbox } from "../common/Checkbox";
import { CheckMark } from "../common/icons/CheckMark";
import { formatNumber } from "../common/utils/formatNumber";
import { useGroupClaimStatus } from "./hooks/useGroupClaimStatus";
import { useGroupMerkleProof } from "./hooks/useGroupMerkleProof";
import { Proposal } from "./hooks/useGroupedProposals";
import { useSnapshotProposalUrl } from "./hooks/useSnapshotUrl";
import { useTreeRoots } from "./hooks/useTreeRoots";
import { useClaimSelectionStore } from "./store/useClaimSelectionStore";
import { getEpochName } from "./utils/getEpochName";

const SNAPSHOT_WEB = import.meta.env.VITE_SNAPSHOT_WEB;
const SNAPSHOT_SPACE = import.meta.env.VITE_SNAPSHOT_SPACE;

const PastProposal = ({
  proposal,
  voted,
}: {
  proposal: Proposal;
  voted?: boolean;
}) => {
  const proposalUrl = useSnapshotProposalUrl(proposal.id);
  return (
    <div
      onClick={() => window.open(proposalUrl, "_blank")}
      className={twJoin([
        "grid grid-cols-[auto,1fr,auto,auto] border-t border-gray-800",
        "items-center cursor-pointer",
      ])}
      key={proposal.id}
    >
      <div className="justify-self-center py-3.5 grid place-items-center w-6 mx-5">
        {voted ? (
          <span className="text-green-400">
            <CheckMark size={20} />
          </span>
        ) : (
          <span className="text-red-600">
            <MdClose size={20} />
          </span>
        )}
      </div>
      <div className="text-font-secondary text-sm leading-6 font-medium text-gray-500">
        {proposal.title}
      </div>
      <div></div>
      <div className="grid place-items-center w-8 h-8 mr-4">
        <a
          href={`${SNAPSHOT_WEB}#/${SNAPSHOT_SPACE}/proposal/${proposal.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <MdOpenInNew size={16} />
        </a>
      </div>
    </div>
  );
};

export const PastEpochCard = ({
  proposalGroup,
}: {
  proposalGroup: Proposal[];
}) => {
  const { address: connectedAccount } = useAccount();
  const [
    isClaimSelected,
    setClaimSelected,
    setPointsClaimableForEpoch,
    addClaim,
    removeClaimForTree,
  ] = useClaimSelectionStore((state) => [
    state.isClaimSelected,
    state.setClaimSelected,
    state.setPointsClaimableForEpoch,
    state.addClaim,
    state.removeClaimForTree,
  ]);

  const {
    pointsEarned,
    hasUserClaimed,
    votedForProposal,
    votedOnAllProposals,
    treeId,
  } = useGroupClaimStatus({
    proposalGroup,
  });

  const { data: proof } = useGroupMerkleProof({
    proposalIds: proposalGroup.map((p) => p.id),
    enabled: !!connectedAccount && !hasUserClaimed && votedOnAllProposals,
    vote: {
      voter: connectedAccount!,
      vp: pointsEarned,
    },
  });

  const [{ data: root }] = useTreeRoots({
    treeIds: [treeId],
  });

  const claim = useMemo(() => {
    if (!proof) return;
    return {
      proof: proof,
      tree: treeId,
      value: pointsEarned,
    };
  }, [pointsEarned, proof, treeId]);

  useEffect(() => {
    if (root && claim && !hasUserClaimed) {
      setPointsClaimableForEpoch(proposalGroup[0].id, pointsEarned);
      addClaim(claim);
    } else {
      setPointsClaimableForEpoch(proposalGroup[0].id, 0);
      removeClaimForTree(treeId);
    }
  }, [
    addClaim,
    claim,
    removeClaimForTree,
    treeId,
    proposalGroup,
    pointsEarned,
    hasUserClaimed,
    setPointsClaimableForEpoch,
    root,
  ]);

  const { isConnected: isWalletConnected } = useAccount();

  if (!isWalletConnected) return null;

  const proposalGroupTitle = getEpochName(proposalGroup[0]);

  const trigger = (
    <div className="flex w-full items-center justify-between pr-4 font-semibold">
      {/* Checkbox and title. */}
      <div className="flex items-center">
        {/* Checkbox */}
        <div
          className={twJoin(
            "align-center -mt-1 mr-5 items-center",
            !isWalletConnected && "hidden",
          )}
        >
          <Checkbox
            disabled={
              !root || // disabled if there's no root
              hasUserClaimed || // or if the user has already claimed
              pointsEarned === 0 || // or if there are no points to claim
              !proof || // or if proof isn't ready yet.
              !claim // or if claim isn't ready yet.
            }
            checked={isClaimSelected(treeId)}
            onCheckedChange={(newState) => {
              // Button will be disabled if there's no claim, so ! is ok.
              setClaimSelected(claim!, newState as boolean);
            }}
          />
        </div>
        {/* Title */}
        <div
          className={twMerge(
            "font-bold",
            (hasUserClaimed || !votedOnAllProposals) && "text-gray-500",
          )}
        >
          {proposalGroupTitle}
        </div>
      </div>

      {/* Points */}
      <div
        className={twJoin([
          "rounded-full px-4 py-1 text-xs font-bold uppercase leading-6",
          "flex flex-row items-center gap-2 ring-1 ring-gray-800",
          (hasUserClaimed || !votedOnAllProposals) && "text-gray-500",
          !isWalletConnected && "hidden",
        ])}
      >
        {hasUserClaimed && (
          <span className="text-green-400">
            <CheckMark size={20} />
          </span>
        )}
        {!votedOnAllProposals && (
          <span className="text-red-600">
            <MdClose size={20} />
          </span>
        )}
        {/* TODO: small numbers of points probably don't need decimals. */}

        {votedOnAllProposals ? (
          <span>
            {formatNumber(pointsEarned)}
            &nbsp; Points {hasUserClaimed && " claimed "}
          </span>
        ) : (
          <span>Missed</span>
        )}
      </div>
    </div>
  );

  const content = proposalGroup.map((proposal, i) => (
    <PastProposal
      proposal={proposal}
      voted={votedForProposal[i]}
      key={proposal.id}
    />
  ));

  return (
    <Accordion
      className="w-full items-center border border-gray-800 rounded"
      trigger={trigger}
      itemId={treeId}
      content={content}
    />
  );
};
