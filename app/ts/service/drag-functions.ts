// module handleFunctions {
//     let dragElement: any = null;

//     function handleDragStart(el: any) {
//         this.style.color = '#4a4a4a';
//         dragElement = this;

//         el.dataTransfer.effectAllowed = 'move';
//         el.dataTransfer.setData('text/html', this.innerHTML);

//         console.log('drag')
//     }
//     function handleDragOver(el: any) {
//         console.log('over');
//         if (el.preventDefault) {
//             el.preventDefault();
//         }
//         el.dataTransfer.dropEffect = 'move';
//         this.style.color = '#000';
//         return false;
//     }
//     function handleDragLeave(el: any) {
//         this.classList.add('change-position');
//         console.log('Leave');
//     }
//     function handleDragEnter(el: any) {
//         this.classList.remove('change-position');
//         console.log('Enter');
//     }
//     function handleDragEnd(el: any) {
//         [].forEach.call(document.querySelectorAll("ul>li"), function (inner: any) {
//             inner.classList.remove('change-position');
//         })
//     }
//     function handleDrop(el: any) {
//         if (el.stopPropagation) {
//             el.stopPropagation(); // Stops some browsers from redirecting.
//         }
//         if (dragElement != this) {
//             dragElement.innerHTML = this.innerHTML;
//             console.log(this)
//             this.innerHTML = el.dataTransfer.getData('text/html');
//         }
//         return false;
//     }
// }
