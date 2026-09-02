<script setup>
import { creneaux, jours } from '@/data/timetables'

defineProps({
  timetable: { type: Object, required: true }
})
</script>

<template>
  <div class="card overflow-x-auto">
    <table class="w-full text-[11px] border-collapse min-w-[520px]">
      <thead>
        <tr>
          <th class="text-left text-ink-400 font-semibold pb-2 pr-2 w-24">Horaire</th>
          <th v-for="j in jours" :key="j" class="text-left text-ink-500 font-bold pb-2 px-1">{{ j }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, i) in creneaux" :key="c">
          <td class="text-ink-400 py-1 pr-2 whitespace-nowrap align-top">{{ c }}</td>
          <td v-for="j in jours" :key="j + c" class="py-1 px-1 align-top">
            <span
              class="block rounded-md px-1.5 py-1 text-[10.5px] font-semibold leading-tight"
              :class="timetable[j][i].type === 'cours' ? 'bg-brand-50 text-brand-700' : 'bg-ink-50 text-ink-400'"
            >
              {{ timetable[j][i].matiere }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
