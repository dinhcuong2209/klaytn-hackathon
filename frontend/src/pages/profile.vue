<template>
    <div>
        <HomepageHeader />
        <ConcertArtistFeaturedHeader />
        <ConcertArtistPageHeader :search="search" />
        <ProfileConcert
            :sort="sort"
            :back-page="backPage"
            :next-page="nextPage"
            :set-page="setPage"
            :total-page="totalPage"
            :total-items="totalItems"
            :current-page="filter.currentPage"
            :data="data"
        />
        <HomepageFooter />
    </div>
</template>

<script>
    import profile from '@/api/profile';
    import dayjs from 'dayjs';

    export default {
        data() {
            return {
                totalPage: 0,
                totalItems: this.totalItems,
                data: [],
                filter: {
                    keyword: '',
                    currentPage: 1,
                    order: 'price',
                    orderBy: 'asc',
                },
            };
        },
        watch: {
            filter() {
                this.getData();
            },
        },
        created() {
            this.getData();
        },
        methods: {
            backPage() {
                if (this.filter.currentPage > 1) {
                    const filter = this.filter;
                    filter.currentPage -= 1;
                    this.filter = { ...filter };
                }
            },
            nextPage() {
                if (this.currentPage < this.totalPage) {
                    const filter = this.filter;
                    filter.currentPage += 1;
                    this.filter = { ...filter };
                }
            },
            setPage(page) {
                const filter = this.filter;
                filter.currentPage = page;
                this.filter = { ...filter };
            },
            async getData() {
                try {
                    const userAddress = localStorage.getItem('userAddress');
                    const res = await profile.getMyConcert(userAddress, this.filter);
                    this.totalPage = res.data.data.metadata.totalPage;
                    this.totalItems = res.data.data.metadata.totalItems;
                    this.data = res.data.data.items;

                    if (res && res.data && res.data.data && res.data.data.items) {
                        this.data = res.data.data.items.map((item) => ({
                            ...item,
                            startTime: dayjs(item.concert.startTime).format('ddd DD MMM'),
                            dayOfWeek: dayjs(item.concert.startTime).format('dddd'),
                            time: dayjs(item.concert.startTime).format('h:mm A'),
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            search(keyword) {
                const filter = this.filter;
                filter.currentPage = 1;
                filter.keyword = keyword;
                this.filter = { ...filter };
            },
            sort(value) {
                const filter = this.filter;
                filter.currentPage = 1;
                filter.orderBy = value;
                this.filter = { ...filter };
            },
        },
    };
</script>

<style></style>
