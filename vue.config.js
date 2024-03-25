const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/vue2/',
  chainWebpack: config => {
		config.entry('app').clear().add('/src/plugins/app/_config/main.js')
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://shoppinglist.wezeo.dev/cms/',
				changeOrigin: true
			}
		}
	}
})

