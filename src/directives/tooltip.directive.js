export default {
  bind(el, binding) {
    const text = binding.value.text ? binding.value.text : binding.value
    const position = binding.value.position ? binding.value.position : 'top'

    M.Tooltip.init(el, {
      html: text,
      position: position,
    })
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
}
