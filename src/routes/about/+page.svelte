<!-- <script>
const onDragstart = (e, value) => {
    oldData = value;
    console.log(value, '---onDragstart---');
}
const onDragenter = (e, value) => {
    console.log(value, '---onDragenter---');
}
const onDragend = (app, listData) => {
    console.log(app, '---onDragend----');
}
</script>
<div class="h-screen bg-white p-4">
    <div draggable={true} class="text-xl h-14 z-[999] bg-gray-400 mt-3 p-4 rounded text-white">1231</div>
    <div class="h-40" role="none" on:pointerdown|stopPropagation on:pointermove|stopPropagation on:pointerup|stopPropagation on:dragstart={onDragstart} on:dragenter={onDragenter} on:drag={onDragend}>
        <h3>关于我们</h3>
    </div>
</div> -->
<script>
    let highlight=""
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