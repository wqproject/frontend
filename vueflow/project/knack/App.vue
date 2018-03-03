<template>
  	<div id="app">
    	<keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <!-- 这里不会被keepalive -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
  	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	@import '../../static/css/reset.scss';
	body {
		max-width: 600px;
		margin: 0 auto;
		font-size: 0.32rem;
		font-family: "PingFang SC";
	}
	html, body, #app {
		height: 100%;
	}
</style>
