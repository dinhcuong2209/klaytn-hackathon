<template>
    <div v-if="totalPage > 0" class="artist-event-footer">
        <ul class="pagination">
            <li @click="backPage">
                <a href="javascript:void(0);" aria-label="Previous">
                    <span aria-hidden="true"><i class="fa fa-long-arrow-left" aria-hidden="true" />
                        Previous</span>
                </a>
            </li>
            <li
                v-for="number in totalPage"
                :key="`paginate_${number}`"
                :class="[{ 'active': number === currentPage }]"
                @click="() => { setPage(number) }"
            >
                <a href="javascript:void(0);">{{ number }}</a>
            </li>
            <li @click="nextPage">
                <a href="javascript:void(0);" aria-label="Next">
                    <span aria-hidden="true">Next
                        <i class="fa fa-long-arrow-right" aria-hidden="true" />
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            backPage: Function,
            nextPage: Function,
            setPage: Function,
            totalPage: Number,
            totalItems: Number,
            currentPage: Number,
        },
    };
</script>
