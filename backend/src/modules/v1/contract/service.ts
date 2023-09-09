import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { LogService } from 'src/commons/logging/logger.service';
import { ABI } from './abi';
import { config } from 'dotenv';
config();

@Injectable()
export class ContractService {
  private readonly provider: ethers.providers.JsonRpcProvider;
  private readonly contract: ethers.Contract;
  private readonly wallet: ethers.Wallet;

  constructor(private myLogger: LogService) {
    this.myLogger.setContext(ContractService.name);
    this.provider = new ethers.providers.JsonRpcProvider(
      process.env.BSC_TESTNET_URL,
    );
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      ABI,
      this.wallet,
    );
  }

  async createTicket(_address: string, price: number, uri: string) {
    const gasPrice = await this.provider.getGasPrice();
    const amount = ethers.utils.parseEther(price.toString());
    const newTicket = await this.contract.setTicket(_address, amount, uri, {
      gasPrice,
    });
    return newTicket.wait();
  }

  async createConcert(name: string, symbol: string) {
    const gasPrice = await this.provider.getGasPrice();
    const newConcertNFT = await this.contract.createCollection(name, symbol, {
      gasPrice,
    });
    return newConcertNFT.wait();
  }
}
