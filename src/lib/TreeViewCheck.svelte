<script>
  export let state = 'none'
</script>

{#if state === 'all'}
  <span>[x]</span>
{:else if state === 'intermediate'}
  <span>[-]</span>
{:else}
  <span>[&nbsp]</span>
{/if}

<style>
  span {
    font-family: monospace;
  }
</style>