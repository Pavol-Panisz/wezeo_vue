<template>
	<h1>Lists</h1>

	<template v-if="!shoppingLists">
		<p>Načítavam dáta</p>
	</template>

	<template v-else-if="shoppingLists.error">
		Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
	</template>

	<template v-else>
		Počet položiek v zozname: {{ shoppingLists.length }}

        <div v-for="shoppingList in shoppingLists" :key="shoppingList.id" class="shopping-lists-list">
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
			// const response = await axios.get('https://shoppinglist.wezeo.dev/shoppinglist/lists')
			// const data = response.data.data

			// Skrateny zapis zakomentovaneho kodu vyssie, kde vytiahneme data pomocou destrukcie objektu
			const { data: { data: shoppingLists} } = await axios.get('/api/v1/shopping-lists')
			this.shoppingLists = shoppingLists

            console.log(shoppingLists[0])

		} catch (error) {
			console.error('Error:', error)
			this.shoppingLists = { error }
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
