<template>
    shopping list detail

    <template v-if="!shoppingList">
		<p>Načítavam dáta</p>
	</template>
    
    <template v-else>
        <div v-for="item in shoppingList.items" :key="shoppingList.items.id">
                {{ item.name }}
        </div>
    </template>

</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			shoppingList: null
		}
	},

    async mounted() {
        try {
            const { data: { data: shoppingLists } } = await axios.get('https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists')
            this.shoppingList = shoppingLists.find(({ id }) => id == this.$route.params.id)
        } catch (error) {
            console.error('Error:', error)
            this.shoppingList = { error }
        }
    }
}
</script>