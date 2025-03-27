<script lang="ts">
  // import { onMount } from 'svelte'
  import { createForm } from 'svelte-forms-lib'
  import { z } from 'zod'
  import { supabase } from '../lib/supabaseClient'

  const schema = z.object({
    date: z.date(),
    time: z.string().min(0),
    amount: z.number().min(0),
    weight: z.number().min(0),
  })

  function getCurrentTime(): string {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0') // Add leading zero if needed
    const minutes = now.getMinutes().toString().padStart(2, '0') // Add leading zero if needed
    return `${hours}:${minutes}`
  }

  const placeholderTime = getCurrentTime()
  // onMount(() => {})

  const { form, errors, handleSubmit } = createForm({
    initialValues: {
      date: new Date(),
      time: getCurrentTime(),
      amount: 0,
      weight: 0,
    },
    validationSchema: schema,
    onSubmit: async ({ date, time, amount, weight }) => {
      const { error } = await supabase.from('feedings').insert([{ date, time, amount, weight }])
      if (error) {
        console.error('Error saving feeding:', error)
      } else {
        form.set({ date: new Date(), time: '0', amount: 0, weight: 0 })
      }
    },
  })
</script>

<form method="post" on:submit={handleSubmit}>
  <label>
    Time:
    <input type="time" placeholder={placeholderTime} bind:value={$form.time} />
    {#if $errors.time}
      <p class="error">{$errors.time}</p>
    {/if}
  </label>

  <label>
    Amount (ml):
    <input type="number" bind:value={$form.amount} />
    {#if $errors.amount}
      <p class="error">{$errors.amount}</p>
    {/if}
  </label>

  <label>
    Weight (kg):
    <input type="number" bind:value={$form.weight} />
    {#if $errors.weight}
      <p class="error">{$errors.weight}</p>
    {/if}
  </label>

  <button type="submit">Save</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 20px auto;
  }

  div {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  button {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
  .error {
    color: red;
  }
</style>
