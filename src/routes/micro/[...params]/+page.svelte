<svelte:head>
    <title>{data.title}</title>
</svelte:head>
<script>
    export let data;
</script>
<iframe src="{data.url}" title={data.title} frameborder="0" style="width: 100%;height: 100%;"></iframe>