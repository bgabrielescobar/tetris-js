
export default function EventHandler() {
    document.addEventListener('keydown', event => {
        console.log('test')
        if (event.keyCode == 37){
            playerMove(-1);
        }else if (event.keyCode == 39) {
            playerMove(1);
        }else if (event.keyCode == 40){
            playerDrop();
        }
    });

}