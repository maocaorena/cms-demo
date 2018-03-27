<template>
	<div id="layout">
		<h2 id="logo">算命</h2>
		<el-menu
		mode="vertical"
		:default-active="$route.path"
		class="left-bar"
		background-color="#324157"
      	text-color="#fff"
		>
			<template v-for="(item,index) in routes">
				<el-submenu :index="item.path" v-if="item.children">
					<template slot="title">{{item.meta.name}}</template>
					<el-menu-item-group>
						<template v-for="item1 of item.children">
							<router-link :to="item1.path">
								<el-menu-item :index="item1.path" >{{item1.meta.name}}</el-menu-item>
							</router-link>
						</template>
					</el-menu-item-group>
				</el-submenu>
				<router-link v-if="!item.children" :to="item.path">
					<el-menu-item :index="item.path">
						<span>{{item.meta.name}}</span>
					</el-menu-item>
				</router-link>
			</template>
		</el-menu>
		<div class="tabNav">
			<navBar></navBar>
		</div>
		<div class="web-main">
			<transition name="el-fade-in">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import navBar from './navBar/navBar.vue'
	export default {
		methods: {
			handleOpen(item) {
				this.$router.push({
					path: item.path
				});
			}
		},
		computed: {
			routes() {
				return this.$store.getters.routes;
			},
			tabList() {
				return this.$store.getters.tabList;
			},
		},
		components: {
			'navBar': navBar
		},
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import './layout'
</style>
