import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';

dotenv.config()

const QUICKNODE_RPC_URL = process.env.QUICKNODE_HTTP_URL as string;

const config: HardhatUserConfig = {
    solidity: "0.8.10",
    networks: {
        hardhat: {
            forking: {
                url: QUICKNODE_RPC_URL
            }
        }
    }
};

export default config;
