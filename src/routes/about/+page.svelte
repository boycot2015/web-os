<script>
    let highlight="";
</script>
<div class="h-screen bg-white p-4">
    <div role="none" class="dropon {highlight}" 
        on:dragenter={ event => {
            highlight="highlight"
            console.log( "enters") 
        }} 
            on:dragleave={ event => {
        highlight=""
            console.log( "leaves") 
        }} 
    >
        <div class="inner">
            drop on me
        </div>
    </div>
    
    <div class="drag" draggable={true}>drag me</div>
</div>

<style>
    .dropon {
        padding: 20px;
        margin: 10px;
        background: #fee;
    }
    .drag {
        padding:20px;
        margin: 10px;
        cursor:grab;
        background: #efe;
    }
    .inner {
            background: #eef;
        padding: 8px;
    }
    .highlight {
        background: red;
    }
</style>