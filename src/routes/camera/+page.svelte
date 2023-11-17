<!-- svelte-ignore a11y-media-has-caption -->
<div class="camera w-full h-full">
    {#if !hasPermission}
    <Modal bind:visible={visible} title="温馨提示" injTitleClass="text-white text-2xl" on:close={() => {visible = false;goto('/')}} showBtn={true} contentSlot popup={{size: 50, radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', easeType: 'cubicInOut',duration: 500 ,outDuration: 500,px: 4, py: 0, mask: {opacity: 0.3, backdropBlur: '2xl'}}}>
        <div class="flex flex-col items-center w-full h-full justify-center">
            <Icon name={'ri-shield-keyhole-line'} size={50} injClass="text-white"></Icon>
            <p class="my-10 text-xl text-white">检测到环境异常，无法打开摄像头！</p>
        </div>
    </Modal>
    {:else }
    <video id="video" this={video} caption=""></video>
    <canvas id="canvas" this={canvas} on:click={() => onHandlerPhoto}></canvas>
    {/if}
</div>
<script>
    import { Icon } from 'stdf';
    import { goto } from '$app/navigation';
    import Modal from '$lib/components/Modal.svelte';
    // 视频大小
    var video = null;
    var canvas = null;
    let hasPermission = true;
    let visible = true;
    var constraints = { audio: true, video: { width: 200, height: 250 } };
    hasPermission = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
    navigator.webkitGetUserMedia && navigator.webkitGetUserMedia({
        video: true
    }, success, error);
    function success(stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }
    function error(err) {
        console.log('video error: ' + err);
        hasPermission = false
    }
    // 开启视频
    navigator.mediaDevices && navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(mediaStream) {
        console.log("getUserMedia:", mediaStream);
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
        video.play();
        };
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
        hasPermission = false
    });
    function onHandlerPhoto () {
        // 使用canvas进行拍照
        canvas.getContext("2d").drawImage(video, 0, 0, 200, 250);
        console.log(canvas.toDataURL("image/png"), 'image');
    }
</script>