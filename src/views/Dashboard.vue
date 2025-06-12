<script setup>
import StatsWidget from '@/components/dashboard/StatsWidget.vue';
import DashboardInicio from '@/components/Bienvenida.vue';
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12">
      <DashboardInicio />
    </div>

    <StatsWidget />
    
    <!--
    <div class="col-span-12 xl:col-span-6">
        <RecentSalesWidget />
        <BestSellingWidget />
    </div>
    
    <div class="col-span-12 xl:col-span-6">
        <RevenueStreamWidget />
        <NotificationsWidget />
    </div>
    -->
  </div>
</template>
