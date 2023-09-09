<template>
    <div id="masthead" class="site-header fix-header header-1">
        <div class="main-header">
            <div class="container">
                <div class="row">
                    <div class="site-branding col-md-2">
                        <h1 class="site-title">
                            <router-link
                                to="/"
                                title="myticket"
                                rel="home"
                            ><img
                                src="~assets/images/logo.png"
                                alt="logo"
                            ></router-link>
                        </h1>
                    </div>

                    <div class="col-md-10">
                        <nav id="site-navigation" class="navbar">
                            <div
                                id="js-bootstrap-offcanvas"
                                class="navbar-offcanvas navbar-offcanvas-touch navbar-offcanvas-right"
                            >
                                <button
                                    type="button"
                                    class="offcanvas-toggle closecanvas"
                                    data-toggle="offcanvas"
                                    data-target="#js-bootstrap-offcanvas"
                                >
                                    <i class="fa fa-times fa-2x" aria-hidden="true" />
                                </button>
                                <ul class="nav navbar-nav navbar-right" style="display:flex;">
                                    <li class="active">
                                        <router-link
                                            to=""
                                        >Schedule</router-link>
                                    </li>
                                    <li>
                                        <router-link
                                            to="/concert"
                                        >Concerts</router-link>
                                    </li>
                                    <li>
                                        <router-link
                                            to=""
                                        >Sports</router-link>
                                    </li>
                                    <li>
                                        <router-link
                                            to=""
                                        >Parties</router-link>
                                    </li>
                                    <li>
                                        <router-link
                                            to=""
                                        >Theater</router-link>
                                    </li>
                                    <li>
                                        <router-link
                                            to=""
                                        >Gallery</router-link>
                                    </li>
                                    <li>
                                        <router-link
                                            to="/profile"
                                        >Ticekts</router-link>
                                    </li>
                                    <li v-if="!balanceInEther" class="connect-wallet" @click="connectWallet()">
                                        <i class="fa fa-credit-card-alt icon-wallet" aria-hidden="true" />
                                        <div class="text-wallet">
                                            Connect wallet
                                        </div>
                                    </li>

                                    <li v-else-if="balanceInEther && currency" class="connect-wallet">
                                        <i class="fa fa-credit-card-alt icon-wallet" aria-hidden="true" />
                                        <div class="text-wallet">
                                            {{ balanceInEther }} {{ currency }}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                balanceInEther: 0,
                walletAddress: '',
                currency: 'BNB',
            };
        },
        mounted() {
            const userAddress = localStorage.getItem('userAddress');
            if (userAddress) {
                this.connectWallet();
            }
            this.watchAccount();
        },
        methods: {
            async connectWallet() {
                if (typeof window.ethereum !== 'undefined') {
                    try {
                        // Request wallet access
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        const walletAddress = accounts[0];
                        this.walletAddress = walletAddress;

                        this.getBalance(walletAddress);
                        localStorage.setItem('userAddress', walletAddress);
                    } catch (error) {
                        console.error('Wallet connection error:', error);
                    }
                }
            },

            async getBalance(walletAddress) {
                const provider = this.$provider;
                const balance = await provider.getBalance(walletAddress);

                this.balanceInEther = this.$ethers.utils.formatEther(balance);
            },

            async watchAccount() {
                if (window.ethereum) {
                    window.ethereum.on('accountsChanged', (accounts) => {
                        if (accounts.length > 0) {
                            this.connectWallet();
                        } else {
                            console.log('No Ethereum accounts are available.');
                        }
                    });
                } else {
                    console.log('Ethereum provider not detected.');
                }
            },
        },
    };
</script>

<style lang="scss">
    .connect-wallet {
        background-color: #f89406;
        background-size: 25px 23px !important;
        border: 1px solid #f89406;
        border-radius: 20px;
        padding: 7px 20px !important;
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        color: #fff !important;
        font-size: 15px;
        cursor: pointer;

        .text-wallet {
            margin-left: 8px;
        }
    }

</style>
