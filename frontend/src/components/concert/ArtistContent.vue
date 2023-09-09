<template>
    <div class="section-artist-content">
        <div class="container">
            <div class="row">
                <div id="primary" class="col-sm-12 col-md-8">
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
                                <h3>{{ item.name }}</h3>
                                <ul class="row">
                                    <li class="col-sm-5">
                                        <span>Venue</span>
                                        {{ item.location }}
                                        <span
                                            class="location"
                                        >{{ item.location }}</span>
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
                                <strong>{{ item.price }} <small>BNB</small></strong>
                                <a href="javascript:void(0)" @click="() => { buyTicket(item) }">Book Now</a>
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

                <div id="secondary" class="col-sm-12 col-md-4">
                    <div class="artist-details">
                        <img
                            src="~assets/images/artist-img-profile.jpg"
                            alt="image"
                        >
                        <div class="artist-details-title">
                            <h3>Serena Gemez</h3>
                            <a href="artist-page.html#">Follow</a>
                        </div>

                        <div class="artist-details-info">
                            <h4>About</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetuer adipi
                                elit, sed diam nonummy nibh euismod tincidunt ut
                                laoreet dolore magna aliquam erat volutpat. sed
                                diam nonummy nibh euismod tincidunt ut laoreet
                                dolore magna aliquam erat volutpat.
                            </p>
                        </div>
                    </div>

                    <div class="related-artist">
                        <h3>RELATED ARTISTS</h3>
                        <ul class="related-artist-list">
                            <li class="related-artist-item">
                                <div
                                    class="related-artist-img col-md-12 col-lg-4"
                                >
                                    <a
                                        href="artist-page.html#"
                                    ><img
                                        src="~assets/images/related-artist-1.jpg"
                                        alt="image"
                                    ></a>
                                </div>
                                <div
                                    class="related-artist-info col-md-12 col-lg-8"
                                >
                                    <h4>
                                        <a
                                            href="artist-page.html#"
                                        >Jason Carpenter</a>
                                    </h4>
                                    <a href="artist-page.html#">Follow</a>
                                </div>
                            </li>
                            <li class="related-artist-item">
                                <div
                                    class="related-artist-img col-md-12 col-lg-4"
                                >
                                    <a
                                        href="artist-page.html#"
                                    ><img
                                        src="~assets/images/related-artist-2.jpg"
                                        alt="image"
                                    ></a>
                                </div>
                                <div
                                    class="related-artist-info col-md-12 col-lg-8"
                                >
                                    <h4>
                                        <a
                                            href="artist-page.html#"
                                        >Elizabeth Simmons</a>
                                    </h4>
                                    <a href="artist-page.html#">Follow</a>
                                </div>
                            </li>
                            <li class="related-artist-item">
                                <div
                                    class="related-artist-img col-md-12 col-lg-4"
                                >
                                    <a
                                        href="artist-page.html#"
                                    ><img
                                        src="~assets/images/related-artist-3.jpg"
                                        alt="image"
                                    ></a>
                                </div>
                                <div
                                    class="related-artist-info col-md-12 col-lg-8"
                                >
                                    <h4>
                                        <a
                                            href="artist-page.html#"
                                        >Christina Guerrero</a>
                                    </h4>
                                    <a href="artist-page.html#">Follow</a>
                                </div>
                            </li>
                            <li class="related-artist-item">
                                <div
                                    class="related-artist-img col-md-12 col-lg-4"
                                >
                                    <a
                                        href="artist-page.html#"
                                    ><img
                                        src="~assets/images/related-artist-4.jpg"
                                        alt="image"
                                    ></a>
                                </div>
                                <div
                                    class="related-artist-info col-md-12 col-lg-8"
                                >
                                    <h4>
                                        <a
                                            href="artist-page.html#"
                                        >Michelle Cunningham</a>
                                    </h4>
                                    <a href="artist-page.html#">Follow</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ethers } from 'ethers';
    import ticketAbi from '~/assets/abi/ticket.json';
    import { FACTORY_ADDRESS } from '~/utils/constants';
    import profile from '@/api/profile';

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
        methods: {
            async buyTicket(item) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const nftContract = new ethers.Contract(FACTORY_ADDRESS, ticketAbi, signer);

                    const buyer = localStorage.getItem('userAddress');
                    const nftPriceInWei = ethers.utils.parseEther(item.price.toString());
                    const gasLimit = ethers.utils.hexlify(400000);
                    const gasPrice = ethers.utils.parseUnits('5', 'gwei');
                    const transaction = await nftContract.buyTicket(
                        buyer,
                        nftPriceInWei,
                        item.address,
                        {
                            value: nftPriceInWei,
                            gasLimit,
                            gasPrice,
                        },
                    );
                    transaction.wait();
                    const body = {
                        concertAdd: item.address,
                        concert: item._id,
                        walletAdd: buyer,
                    };
                    await profile.postTicket(body);
                } catch (error) {
                    console.error('Lỗi trong quá trình xử lý giao dịch: ', error);
                }
            },
            handleOrderBy(e) {
                this.sort(e.target.value);
            },
        },
    };
</script>
