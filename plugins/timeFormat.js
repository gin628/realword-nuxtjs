import dayjs from 'dayjs';
import Vue from 'vue';

Vue.filter('dayjs', (time, format = 'YYYY-MM-DD') => dayjs(time).format(format))