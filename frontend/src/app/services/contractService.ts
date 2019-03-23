import {Contract} from "../entities/Contract";
import contractJson from "../MockData/Contract.json"

export class ContractService {

  allContracts: Contract[] = contractJson;

  getReceivedContractsOfUser(id: number): Contract[] {
    let receivedContracts = [];
    for(let contract of this.allContracts) {
      if(contract.receiverId == id)
        receivedContracts.push(contract);
    }
    return receivedContracts;
  }

  getPlacedContractsOfUser(id: number): Contract[] {
    let receivedContracts = [];
    for(let contract of this.allContracts) {
      if(contract.creatorId == id)
        receivedContracts.push(contract);
    }
    return receivedContracts;
  }

  getContractById(id: number): Contract {
    for(let contract of this.allContracts) {
      if(contract.id == id)
        return contract;
    }
    return null;
  }

  acceptContract(id: number): void {
    for(let contract of this.allContracts) {
      if (contract.id === id)
        contract.accepted = true;
    }
  }

  declineContract(id: number): void {
    for(let i=0; i < this.allContracts.length; i++) {
      if (this.allContracts[i].id === id)
        this.allContracts.splice(i, 1);
    }
  }

  submitContract(id: number): void {
    this.declineContract(id);
  }

  cancelContract(id: number) {
    this.declineContract(id);
  }

  calculateReward(contract: Contract): number {
    return contract.providedItems.length - contract.requestedItems.length;
  }

  openContract(contract: Contract) {
    this.allContracts.push(contract);
  }
}
