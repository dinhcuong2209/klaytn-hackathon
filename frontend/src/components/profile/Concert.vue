<template>
    <div class="section-artist-content">
        <div class="container">
            <div class="row">
                <div id="primary" class="col-sm-12">
                    <div class="gb-search-result-header">
                        <div class="row">
                            <div class="col-sm-7 col-xs-12">
                                <h2>All Concerts Events</h2>
                                <span>Showing total {{ totalItems }} Results</span>
                            </div>
                            <div class="col-sm-5 col-xs-12 label-sort">
                                <div class="label-text">Sort By</div>

                                <div class="gb-select-option">
                                    <select class="form-control gb-option" @change="handleOrderBy">
                                        <option value="asc">Price: Low-High</option>
                                        <option value="desc">Price: High-Low</option>
                                    </select>
                                    <div class="gb-ic">
                                        <i
                                            aria-hidden="true"
                                            class="fa fa-angle-down"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-for="item in data" :key="item._id" class="artist-event-item">
                        <div class="row">
                            <div class="artist-event-item-info col-sm-9">
                                <h3>{{ item.concert.name }}</h3>
                                <ul class="row">
                                    <li class="col-sm-5">
                                        <span>Venue</span>
                                        {{ item.concert.location }}
                                        <span
                                            class="location"
                                        >{{ item.concert.location }}</span>
                                    </li>
                                    <li class="col-sm-4">
                                        <span>{{ item.dayOfWeek }}</span>
                                        {{ item.startTime }}
                                    </li>
                                    <li class="col-sm-3">
                                        <span>Time</span>
                                        {{ item.time }}
                                    </li>
                                </ul>
                            </div>
                            <div class="artist-event-item-price col-sm-3">
                                <span>Price From</span>
                                <strong>${{ item.concert.price }}</strong>
                            </div>
                        </div>
                    </div>

                    <Pagination
                        :back-page="backPage"
                        :next-page="nextPage"
                        :set-page="setPage"
                        :total-page="totalPage"
                        :total-items="totalItems"
                        :current-page="currentPage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ethers } from 'ethers';
    import ticketAbi from '~/assets/abi/ticket.json';
    import { FACTORY_ADDRESS } from '~/utils/constants';

    export default {
        props: {
            backPage: Function,
            nextPage: Function,
            setPage: Function,
            totalPage: Number,
            totalItems: Number,
            currentPage: Number,
            data: Array,
            sort: Function,
        },
        data() {
            return {
            };
        },

        methods: {
            handleOrderBy(e) {
                this.sort(e.target.value);
            },

            async sign() {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const nftContract = new ethers.Contract(FACTORY_ADDRESS, ticketAbi, signer);

                    const buyer = localStorage.getItem('userAdress');
                    const ticketFactoryAddress = '0xe4077a8A3d8B4DCa815986e2A2396D29D7E1F0eB';
                    const nftPriceInWei = ethers.utils.parseEther('0.01');
                    const gasPrice = ethers.utils.parseUnits('5', 'gwei');

                    const transaction = await nftContract.buyTicket(
                        buyer,
                        nftPriceInWei,
                        ticketFactoryAddress,
                        {
                            value: nftPriceInWei,
                            gasLimit: 200000,
                            gasPrice,
                        },
                    );

                    // Lấy chữ ký của giao dịch
                    // const transactionHash = await signer.signMessage(transaction.hash);

                    console.log(transaction);
                } catch (error) {
                    console.error('Lỗi trong quá trình xử lý giao dịch: ', error);
                }
            },

        },
    };
</script>
