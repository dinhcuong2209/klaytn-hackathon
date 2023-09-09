import { ethers } from 'ethers';
import ticketAbi from '~/assets/abi/ticket.json';
import { FACTORY_ADDRESS } from '~/utils/constants';

export default (_, inject) => {
    const provider = new ethers.providers.JsonRpcProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545',
    );

    const contract = new ethers.Contract(
        FACTORY_ADDRESS,
        ticketAbi,
        provider,
    );

    inject('ethers', ethers);
    inject('contract', contract);
    inject('provider', provider);
};
