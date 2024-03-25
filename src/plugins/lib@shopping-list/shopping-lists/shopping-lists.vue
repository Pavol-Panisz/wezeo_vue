<template>
	<h1>Lists</h1>

	<template v-if="!shoppingLists">
		<p>Načítavam dáta</p>
	</template>

	<template v-else-if="shoppingLists.error">
		Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
	</template>

	<template v-else>

        <div v-for="shoppingList in shoppingLists" :key="shoppingList.id" class="shopping-lists-list">
            <a :href="`/shopping-lists/${shoppingList.id}`" @click.prevent="openShoppingListDetail(shoppingList)">
                <h2>{{ shoppingList.title }}</h2>
                <ul>
                    <li v-for="item in shoppingList.items" :key="item.id">
                        <span v-if="item.is_checked === true" class="item-unchecked">
                            {{ item.name }}
                        </span>

                        <span v-else class="item-checked">
                            {{ item.name }}
                        </span>

                        {{ item.value }}
                        {{ item.unit }}
                    </li>
                </ul>
            </a>
        </div>
	</template>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			shoppingLists: null
		}
	},

	async mounted() {
		try {
			const { data: { data: shoppingLists} } = await axios.get('https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists')
			this.shoppingLists = shoppingLists

            console.log(shoppingLists[0])

		} catch (error) {
			console.error('Error:', error)
			this.shoppingLists = { error }
		}        
	},
    methods: {
		openShoppingListDetail({ id }) {
			this.$router.push({ name: 'Shopping List - Detail', params: { id } })
		}
	}
}
</script>

<style>
    .shopping-lists-list {
        border: 1px solid black;
        border-radius: 15px;
        padding: 10px;
        margin: 10px;
        width: fit-content;
    }

    .item-checked {
        text-decoration: none;
    }

    .item-unchecked {
        text-decoration: line-through;
    }
</style>
