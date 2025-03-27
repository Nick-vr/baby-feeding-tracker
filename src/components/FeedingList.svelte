<script>
  import { onMount } from 'svelte'

  let feedings = []

  onMount(() => {})
</script>

<style>
  ul {
    list-style-type: none;
    padding: 0;
    max-width: 400px;
    margin: 20px auto;
  }

  li {
    border: 1px solid #ddd;
    margin-bottom: 5px;
    padding: 10px;
    border-radius: 4px;
  }

  h2 {
    text-align: center;
  }

  p {
    text-align: center;
  }
</style>
