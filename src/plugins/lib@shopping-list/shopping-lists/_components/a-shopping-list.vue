
<script>
    export default {
        props: ['title', 'items', 'id'],
        setup(props) {
            console.log(props.itemsList)
        },
        data() {
            return {
                showItemCount: 3 // How many items are shown in this brief list view
            }
	    },
        methods: {
            openShoppingListDetail(id) {
                this.$router.push({ name: 'Shopping List - Detail', params: { id } })
            }
        }
    }
</script>

<template>
    <a :href="`/shopping-lists/${id}`" @click.prevent="openShoppingListDetail(id)" class="shopping-list-link">
        <div class="shopping-list-brief">
            <h2>{{ title }}</h2>
            <ul>
                <li v-for="item in items.slice(0, showItemCount)" :key="item.id">
                    <span v-if="item.is_checked" class="item-unchecked">
                        {{ item.name }}
                        {{ item.value }}
                        {{ item.unit }}
                    </span>
                    <span v-else class="item-checked">
                        {{ item.name }}
                        {{ item.value }}
                        {{ item.unit }}                
                    </span>
                </li>

                <li v-if="items.length > showItemCount">
                    ... and {{ items.length - showItemCount }} more
                </li>

            </ul>
        </div>
    </a>
</template>

<style>
    .shopping-list-link {
        text-decoration: none;
        color: black;
    }

    .shopping-list-brief {
        background-color: antiquewhite;
        border: 1px solid black;
        border-radius: 15px;
        padding: 10px;
        margin: 10px;
        width: fit-content;
    }
    .shopping-list-brief:hover {
        background-color:azure;
    }

    .item-checked {
        text-decoration: none;
    }

    .item-unchecked {
        text-decoration: line-through;
    }
</style>