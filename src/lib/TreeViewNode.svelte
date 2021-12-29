<script>
  import { createEventDispatcher, getContext } from 'svelte'
  import TreeViewCheck from './TreeViewCheck.svelte'
  import TreeViewLeafNode from './TreeViewLeafNode.svelte'

  const dispatch = createEventDispatcher()
  const notifyStateChange = getContext('notifyStateChange')

  export let level = 0
  export let id = ''
  export let text = ''
  export let children = []
  export let initialState = 'none'

  let state = initialState
  let expand = true

  export function forceState(newState) {
    state = newState
    for (const c of childComponents) {
      if (!c) {
        continue
      }
      c.forceState(newState)
    }
  }

  const toggleExpansion = () => {
    expand = !expand
  }

  let childComponents = []

  const padding = `${15 * level}px`

  const setStateRecursively = (entries, s, leaves) => {
    for (const e of entries) {
      e.state = s
      if (e.children && e.children.length > 0) {
        setStateRecursively(e.children, s, leaves)
      } else {
        leaves.add(e.id)
      }
    }
  }

  const calculateMyState = () => {
    console.log('recaluculate my state', text);
    const beforeRecalculate = state
    state = children.every(c => c.state === 'all')
      ? 'all'
      : children.some(c => c.state === 'all' || c.state === 'intermediate' )
        ? 'intermediate'
        : 'none'
    if (beforeRecalculate !== state) {
      console.log('state changed. dispatch');
      dispatch('state', state)
    }
  }

  const handleClick = () => {
    state = state === 'all'
      ? 'none'
      : state === 'intermediate'
        ? 'all'
        : 'all'

    dispatch('state', state)

    const leaves = new Set()
    setStateRecursively(children, state, leaves)
    notifyStateChange(leaves, state)

    for (const c of childComponents) {
      if (!c) {
        continue
      }
      c.forceState(state)
    }
  }

  const handleChildStateChange = (child, state) => {
    child.state = state
    calculateMyState()
  }
</script>

<div class='node' style='margin-left: {padding}; display: flex'>
  <div on:click={toggleExpansion}>-></div>
  <TreeViewCheck state={state} />
  <div on:click={handleClick}>
    id={id} | {text}
  </div>
</div>

{#if expand}
  {#each children as child, i (child.id)}
    {#if child.children && child.children.length > 0}
      <svelte:self
        level={level + 1}
        id={child.id}
        text={child.text}
        initialState={child.state}
        children={child.children}
        on:state={e => handleChildStateChange(child, e.detail)}
        bind:this={childComponents[i]}
      />
    {:else}
      <TreeViewLeafNode
        level={level + 1}
        id={child.id}
        text={child.text}
        initialState={child.state}
        on:state={e => handleChildStateChange(child, e.detail)}
        bind:this={childComponents[i]}
      />
    {/if}
  {/each}
{/if}

<style>
  .node {
    height: 25px;
    line-height: 25px;
  }
</style>
