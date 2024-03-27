<script setup>
    import ShoppingListBrief from './_components/a-shopping-list.vue'
</script>

<template>
	<h1>Lists</h1>

	<template v-if="!shoppingLists">
		<p>Načítavam dáta</p>
	</template>

	<template v-else-if="shoppingLists.error">
		Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
	</template>

    <!-- Loaded shopping lists data, showing their brief representations (first 3 items) -->
	<template v-else>
        <span v-for="shoppingList in shoppingLists" :key="shoppingList.id">
            <ShoppingListBrief :title="shoppingList.title" :items="shoppingList.items" :id="shoppingList.id"/>
        </span>
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

            // console.log(shoppingLists[0])

		} catch (error) {
			console.error('Error:', error)
			this.shoppingLists = { error }
		}        
	}
}
</script>
