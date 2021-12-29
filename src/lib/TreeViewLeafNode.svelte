<script>
  import { createEventDispatcher, getContext } from 'svelte'
  import TreeViewCheck from './TreeViewCheck.svelte'

  const dispatch = createEventDispatcher()
  const notifyStateChange = getContext('notifyStateChange')

  export let level = 0
  export let id = ''
  export let text = ''
  export let initialState = 'none'

  export function forceState(newState) {
    state = newState
  }

  let state = initialState

  const padding = `${15 * level + 15}px`

  const handleClick = () => {
    state = state === 'all' ? 'none' : 'all'
    notifyStateChange([id], state)
    dispatch('state', state)
  }
</script>

<div
  class='node'
  style='margin-left: {padding}; display: flex'
  on:click={handleClick}
>
  <TreeViewCheck {state} />
  <div>
    id={id} | {text}
  </div>
</div>

<style>
  .node {
    height: 25px;
    line-height: 25px;
  }
</style>
