// src/services/soroban.ts
import { Contract, rpc, Horizon } from "@stellar/stellar-sdk";

export const CONTRACT_ID = "CCVJ4BRXYF5R2QSN47FNAYAHKRX5ZESTSNMVR7UOVXHXLH7ICSJLQOAB"; // Điền address Soroban Contract sau khi bạn deploy
export const RPC_URL = "https://soroban-testnet.stellar.org";
export const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

export const server = new rpc.Server(RPC_URL);
export const contractObj = new Contract(CONTRACT_ID);