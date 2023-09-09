<template>
    <!-- <div class="section-artist-page-header">
        <div class="container">
            <h1 class="entry-title">Found 29 Serena Gimez concerts in all locations</h1>
        </div>
    </div> -->
    <div class="section-refine-search">
        <div class="container">
            <div class="row">
                <form>
                    <div class="keyword col-sm-6 col-md-8">
                        <label>Search Keyword</label>
                        <input
                            v-model="searchTerm"
                            type="text"
                            class="form-control hasclear"
                            placeholder="Search"
                        >
                        <span class="clearer" style="display: none;"><img src="~assets/images/clear.png" alt="clear"></span>
                    </div>
                    <!-- <div class="location col-sm-6 col-md-3">
                        <label>Location</label>
                        <div class="location-select-option">
                            <select class="form-control">
                                <option>Viet Nam</option>
                                <option>Laos</option>
                                <option>Cambodia</option>
                                <option>Thailand</option>
                                <option>Japan</option>
                            </select>
                            <div class="ic">
                                <i class="fa fa-angle-down" aria-hidden="true" />

                            </div>
                        </div>
                    </div>
                    <div class="event-date col-sm-6 col-md-3">
                        <label>Event Date</label>
                        <date-picker
                            ref="datePicker"
                            v-model="time3"
                            range
                            name="contract_period"
                            format="DD-MM-YYYY"
                            value-type="format"
                            width="100%"
                            input-class="form-control"
                            placeholder="05-09-2023 05-09-2023"
                        />

                    </div> -->
                    <div class="col-sm-6 col-md-4">
                        <input
                            class="submit-search"
                            type="button"
                            value="Search"
                            @click="sendValueSearchParent"
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            search: Function,
        },
        data() {
            return {
                searchTerm: '',
            };
        },
        methods: {
            sendValueSearchParent() {
                const searchTerm = this.searchTerm.toLowerCase().trim();
                this.search(searchTerm);
            },
        },
    };
</script>

<style></style>
