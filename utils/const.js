import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import spotify from "./spotify.json";

export const SOLANA_HOST = clusterApiUrl("devnet");

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
    "2hGtYXycJ99HEX4iZiutVLbB2hAw63samvv4kv5FDmn5"
);

export const STABLE_POOL_IDL = spotify;
