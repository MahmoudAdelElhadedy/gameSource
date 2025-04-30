<template>
    <div class="container">
        <AppCarousel />
        <br> <br>
        <Featured />
    </div>
</template>

<script setup>
import AppCarousel from '@/utils/carsoule.vue';
import Featured from './featured.vue';

/// ARTICLE STORE
import { useArticleStore } from '@/stores/articale';
const articleStore = useArticleStore();

if (!articleStore.homeArticles) {
    articleStore.getArticles(8);
}
</script>