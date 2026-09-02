<script setup>
import { ref, computed } from 'vue'
import { Wallet } from 'lucide-vue-next'
import TopBar from '@/components/shell/TopBar.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import Badge from '@/components/ui/Badge.vue'
import Avatar from '@/components/ui/Avatar.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PaymentSheet from '@/components/ui/PaymentSheet.vue'
import { useAuthStore } from '@/stores/auth'
import { useChildrenStore } from '@/stores/children'
import { useFeesStore } from '@/stores/fees'
import { formatFcfa } from '@/utils/currency'
import { formatDate } from '@/utils/date'

const auth = useAuthStore()
const childrenStore = useChildrenStore()
const feesStore = useFeesStore()

const myChildren = computed(() => childrenStore.byParent(auth.profile?.id))
const totalDue = computed(() => feesStore.dueForChildren(myChildren.value.map((c) => c.id)))

const feeStatusTone = { payé: 'success', en_attente: 'warning', à_venir: 'neutral' }
const feeStatusLabel = { payé: 'Payé', en_attente: 'À payer', à_venir: 'À venir' }

const payingFee = ref(null)
const payingChildId = ref(null)

function openPay(childId, fee) {
  payingChildId.value = childId
  payingFee.value = fee
}
function onPaid(methode) {
  if (payingFee.value) feesStore.payFee(payingChildId.value, payingFee.value.id, methode)
  payingFee.value = null
}
</script>

<template>
  <div>
    <TopBar title="Scolarité" />
    <div class="p-4 space-y-4">
      <div class="card !bg-brand-600 !text-white">
        <p class="text-xs font-semibold text-brand-100">Total à régler</p>
        <p class="text-2xl font-extrabold">{{ formatFcfa(totalDue) }}</p>
      </div>

      <EmptyState v-if="!myChildren.length" :icon="Wallet" title="Aucun enfant inscrit" />

      <SectionCard v-for="child in myChildren" :key="child.id" :title="`${child.prenom} ${child.nom}`">
        <template #header-extra>
          <Avatar :initials="child.initiales" :color="child.couleur" :size="28" />
        </template>
        <div class="divide-y divide-ink-100">
          <div v-for="f in feesStore.forChild(child.id)" :key="f.id" class="py-2.5 flex items-center justify-between gap-2">
            <div class="min-w-0">
              <p class="text-[13.5px] font-semibold text-ink-800 truncate">{{ f.label }}</p>
              <p class="text-[11.5px] text-ink-400">{{ f.statut === 'payé' ? `Payé le ${formatDate(f.datePaiement)} · ${f.methode}` : `Échéance : ${formatDate(f.dateLimite)}` }}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="font-bold text-ink-800 text-sm">{{ formatFcfa(f.montant) }}</p>
              <button v-if="f.statut === 'en_attente'" data-tour="pay-button" class="text-[11px] font-bold text-brand-600" @click="openPay(child.id, f)">Payer</button>
              <Badge v-else :tone="feeStatusTone[f.statut]">{{ feeStatusLabel[f.statut] }}</Badge>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>

    <PaymentSheet
      :model-value="!!payingFee"
      :label="payingFee?.label || ''"
      :amount="payingFee?.montant || 0"
      @update:model-value="(v) => !v && (payingFee = null)"
      @paid="onPaid"
    />
  </div>
</template>
