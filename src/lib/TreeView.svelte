<script>
  import { setContext } from 'svelte'
  import TreeViewNode from './TreeViewNode.svelte'

  export let root

  const selectedLeaf = new Set()

  const notifyStateChange = (ids, state) => {
    if (state === 'all') {
      ids.forEach(id => selectedLeaf.add(id))
    } else {
      ids.forEach(id => selectedLeaf.delete(id))
    }
  }

  setContext('notifyStateChange', notifyStateChange)

  const printSelectedLeaf = () => {
    console.log(selectedLeaf)
  }
</script>

<TreeViewNode
  id={root.id}
  text={root.text}
  children={root.children}
/>

<button on:click={printSelectedLeaf}>Print Selected Leaf Nodes</button>
