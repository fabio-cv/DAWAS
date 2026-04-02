export function countRejectedConcurrentProposals(totalConcorrentes: number) {
    return Math.max(0, totalConcorrentes - 1);
}
