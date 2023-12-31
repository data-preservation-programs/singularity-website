// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useLs } from '@/modules/zero/composables/use-ls'
import { useDelay } from '@/modules/zero/composables/use-delay'
import { useGetFormFieldStats } from '@/modules/zero/modules/form/composables/use-get-form-field-stats'
import { useZeroFormStore } from '@/modules/zero/modules/form/stores/use-zero-form-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useSaveFieldToLs = async (field) => {
  const store = useZeroFormStore()
  const formId = field.formId
  const modelKey = field.modelKey
  store.setFormSaveState({ id: formId, state: 'saving' })
  const form = JSON.parse(useLs().get(`form__${formId}`)) || { [modelKey]: field }
  if (form) {
    form[modelKey] = field
  }
  useLs().set(`form__${formId}`, JSON.stringify(form))
  await useDelay(1000)
  const formStats = useGetFormFieldStats(formId)
  const state = formStats.completed === formStats.count ? 'completed' : 'saved'
  store.setFormSaveState({ id: formId, state })
}
