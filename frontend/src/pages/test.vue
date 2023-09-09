<template>
    <div>
        <button @click="getConnectInfo">Get Connect Info</button>
        <div>{{ connectInfo }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                connectInfo: '',
            };
        },
        methods: {
            async getConnectInfo() {
                try {
                    console.log('window.ethereum', window.ethereum);
                    const result = await this.$contract.concertInfo(0);
                    this.connectInfo = result;
                } catch (error) {
                    console.error('Error:', error);
                }
            },
        },
    };
</script>
