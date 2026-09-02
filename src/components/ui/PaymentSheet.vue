<script setup>
import { ref, watch } from 'vue'
import { Loader2, CircleCheck } from 'lucide-vue-next'
import BottomSheet from '@/components/ui/BottomSheet.vue'
import { formatFcfa } from '@/utils/currency'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, required: true },
  amount: { type: Number, required: true }
})
const emit = defineEmits(['update:modelValue', 'paid'])

const auth = useAuthStore()
const step = ref('method')
const method = ref('MTN Mobile Money')
const phone = ref(auth.profile?.telephone || '+237 6 ')

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      step.value = 'method'
    }
  }
)

function pay() {
  step.value = 'processing'
  setTimeout(() => {
    step.value = 'success'
  }, 1300)
}

function finish() {
  emit('paid', method.value)
  emit('update:modelValue', false)
}
</script>

<template>
  <BottomSheet :model-value="modelValue" title="Paiement" @update:model-value="(v) => $emit('update:modelValue', v)">
    <div v-if="step === 'method'" class="space-y-4">
      <div class="bg-brand-50 rounded-xl p-3 flex items-center justify-between">
        <span class="text-sm text-brand-700 font-medium">{{ label }}</span>
        <span class="font-extrabold text-brand-700">{{ formatFcfa(amount) }}</span>
      </div>

      <div>
        <p class="field-label">Moyen de paiement</p>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="m in ['MTN Mobile Money', 'Orange Money']"
            :key="m"
            class="rounded-xl border-2 py-2.5 text-xs font-bold tap-scale"
            :class="method === m ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-150 text-ink-500'"
            @click="method = m"
          >
            {{ m }}
          </button>
        </div>
      </div>

      <div>
        <label class="field-label" for="pay-phone">Numéro à débiter</label>
        <input id="pay-phone" v-model="phone" type="tel" class="field-input" placeholder="+237 6 XX XX XX XX" />
      </div>

      <button class="btn-primary w-full" @click="pay">Payer {{ formatFcfa(amount) }}</button>
      <p class="text-[11px] text-ink-300 text-center">Paiement simulé à des fins de démonstration — aucune transaction réelle.</p>
    </div>

    <div v-else-if="step === 'processing'" class="flex flex-col items-center gap-3 py-8">
      <Loader2 :size="34" class="text-brand-600 animate-spin" />
      <p class="text-sm text-ink-500 font-medium">Confirmation en cours sur {{ phone }}…</p>
    </div>

    <div v-else class="flex flex-col items-center gap-2 py-6 text-center">
      <CircleCheck :size="44" class="text-emerald-500" />
      <p class="font-bold text-ink-800">Paiement réussi</p>
      <p class="text-sm text-ink-500">{{ formatFcfa(amount) }} via {{ method }}</p>
      <button class="btn-primary w-full mt-4" @click="finish">Terminer</button>
    </div>
  </BottomSheet>
</template>
