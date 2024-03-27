<template>
    <h1>shopping list detail</h1>

    <template v-if="!shoppingList">
		<p>Načítavam dáta</p>
	</template>
    
    <template v-else>
        <div v-for="item in shoppingList.items" :key="shoppingList.items.id">
                {{ item.name }}
                {{ item.value }}
                {{ item.unit }}

                <!-- I'm surprised this now perfectly binds two ways with
                     the shoppingList item, in the front end -->
                <!-- LEFT  OFF 27.3: implement the PUT REQUEST -->
                <input type="checkbox" v-model="item.is_checked">
        </div>

        <br>
        <button>delete list</button>

    </template>

</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			shoppingList: null,
            itemChecked: false
		}
	},
    methods: {
        checkboxChanged(itemId) {

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