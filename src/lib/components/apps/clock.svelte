<script>
    import { Grid } from 'stdf';
    import { onMount, onDestroy } from 'svelte';
    export let row = 2;
    export let col = 1;
    export let injClass = 'text-purple-600 !bg-gray-800';
    $: canvas = {};
    let timer = null;
    onMount(() => {
        var ctx = canvas.getContext("2d");
        // console.log(ctx);
        //
        function drawPanel() {

            // 将坐标原点移至画布中心
            ctx.translate(150, 150)
            ctx.beginPath();
            ctx.arc(0, 0, 130, 0, 2 * Math.PI)
            ctx.fillStyle = "white";
            ctx.fill()


            // 绘制刻度
            for(let i = 0; i < 60; i++) {
            // 保存canvas的状态（ctx.translate(150, 150)）
                ctx.save()
                ctx.rotate(i * Math.PI / 30)
                ctx.beginPath()
                ctx.moveTo(0, -110)
                ctx.lineTo(0, -120)
                ctx.lineWidth = i % 5 ? 2 : 4
                ctx.strokeStyle =  i % 5 ?'gray':'black'
                ctx.stroke()
                // 恢复canvas上一个保存的状态ctx.translate(150, 150)）
                ctx.restore()
            }
        }
    
        function hourNum() {
            var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            ctx.beginPath();
            ctx.font = "30px 微软雅黑";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            for (var i = 0; i < arr.length; i++) {
                ctx.fillText(
                arr[i],
                90 * Math.cos(((i * 30 - 60) * Math.PI) / 180),
                90 * Math.sin(((i * 30 - 60) * Math.PI) / 180)
                );
            }
        }
    
        function centerDot() {
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.lineWidth = 2
            ctx.fillStyle = "orange";
            ctx.arc(0, 0, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    
        function hourHand(hours, minutes) {
            var radius =
                ((2 * Math.PI) / 12) * hours + (((1 / 6) * Math.PI) / 60) * minutes;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 8;
            ctx.lineCap = "round";
            ctx.strokeStyle = "black";
            ctx.rotate(radius);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -70);
            ctx.stroke();
            ctx.restore();
        }
    
        function minuteHand(minutes) {
            2 * Math.PI;
            var radius = ((2 * Math.PI) / 60) * minutes;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 7;
            ctx.lineCap = "round";
            ctx.strokeStyle = "black";
            ctx.rotate(radius);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -110);
        
            ctx.stroke();
            ctx.restore();
        }
        function secondHand(seconds) {
            var radius = ((2 * Math.PI) / 60) * seconds;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.strokeStyle = "orange";
            ctx.rotate(radius);
            ctx.moveTo(0, 20);
            ctx.lineTo(0, -120);
            ctx.stroke();
            ctx.restore();
        }

        function update() {
            var time = new Date();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            ctx.save();
            drawPanel();
            hourNum();
            hourHand(hours, minutes);
            minuteHand(minutes);
            secondHand(seconds);
            centerDot();
            ctx.restore();
        }
        update();
        timer = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            update();
        }, 1000);
    });
    onDestroy(() => {
        clearInterval(timer)
    })
</script>
<style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }
</style>
<Grid {row} {col}>
    <div
        class="{injClass} bg-white dark:bg-black py-0 rounded-xl text-xl font-bold text-center flex flex-col justify-center shadow dark:shadow-white/10"
    >
        <canvas width="300" height="300" bind:this={canvas} id="canvas"></canvas>
    </div>
</Grid>
